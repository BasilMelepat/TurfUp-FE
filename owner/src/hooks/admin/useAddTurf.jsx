import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format } from "date-fns";
import toast from "react-hot-toast";
import axiosInstance from "../useAxiosInstance";
import { useNavigate } from "react-router-dom";

const addTurfSchema = yup.object().shape({
  name: yup
    .string()
    .required("Enter the name of the turf")
    .min(3, "Name must be at least 3 characters long"),
  description: yup
    .string()
    .required("Enter the description of the turf")
    .min(3, "Description must be at least 3 characters long"),
  location: yup
    .string()
    .required("Enter the location of the turf")
    .min(3, "Location must be at least 3 characters long"),
  pricePerHour: yup
    .number()
    .required("Enter the price per hour of the turf")
    .min(500, "Price per hour must be at least 500 rupees")
    .max(3000, "Price per hour must be at most 3000 rupees"),
  owner: yup
    .string()
    .required("Owner ID is required")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid owner ID format"), // Validates MongoDB ObjectId format
  image: yup
    .mixed()
    .test(
      "image",
      "Please upload a valid image (PNG, JPEG, or WebP)",
      function (value) {
        if (!value || !value[0]) return false;
        const file = value[0];
        const acceptedFormats = ["image/png", "image/jpeg", "image/webp"];
        return acceptedFormats.includes(file.type);
      }
    ),
  openTime: yup.date().required("Open time is required"),
  closeTime: yup
    .date()
    .required("Close time is required")
    .min(yup.ref("openTime"), "Close time must be after open time"),
  sportTypes: yup
    .array()
    .of(yup.string())
    .min(1, "At least one sport type is required"),
});

export default function useAddTurf() {
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]); // State to store available owners
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(addTurfSchema),
    defaultValues: {
      sportTypes: [],
      openTime: null,
      closeTime: null,
      owner: "", // Default empty owner
    },
  });

  const [sportTypes, setSportTypes] = useState([]);
  const [newSportType, setNewSportType] = useState("");
  const openTime = watch("openTime");

  // Fetch available owners when component mounts
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/owners/list");
        setOwners(response.data.owners);
      } catch (error) {
        toast.error("Failed to fetch owners list");
        console.error("Error fetching owners:", error);
      }
    };

    fetchOwners();
  }, []);

  useEffect(() => {
    setValue("sportTypes", sportTypes);
  }, [sportTypes, setValue]);

  const addSportType = () => {
    if (newSportType && !sportTypes.includes(newSportType)) {
      setSportTypes([...sportTypes, newSportType]);
      setNewSportType("");
    }
  };

  const removeSportType = (type) => {
    setSportTypes(sportTypes.filter((sport) => sport !== type));
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "image") {
        if (data[key] && data[key][0]) {
          formData.append(key, data[key][0]);
        }
      } else if (key === "openTime" || key === "closeTime") {
        if (data[key] instanceof Date) {
          formData.append(key, format(data[key], "hh:mm aa"));
        }
      } else if (key === "sportTypes") {
        if (Array.isArray(data[key])) {
          data[key].forEach((sport, index) => {
            formData.append(`sportTypes[${index}]`, sport);
          });
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await axiosInstance.post(
        "/api/admin/turfs/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = await response.data;
      toast.success(result.message);
      navigate("/admin/turfs");
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    onSubmit,
    sportTypes,
    newSportType,
    setNewSportType,
    addSportType,
    removeSportType,
    openTime,
    loading,
    owners, // Return owners list for select dropdown
  };
}
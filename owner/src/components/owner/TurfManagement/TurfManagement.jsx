import { useEffect, useState } from "react";
import useTurfManagement from "@hooks/owner/useTurfManagement";
import EditTurfForm from "./EditTurfForm";
import TurfCardSkeleton from "./TurfCardSkeleton";
import TurfCard from "./TurfCard";
import { toast } from "react-hot-toast";

const TurfManagement = () => {
  const { turfs, isLoading, error, fetchTurfs, editTurf, deleteTurf } = useTurfManagement();
  const [editingTurf, setEditingTurf] = useState(null);

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleEdit = (turf) => {
    setEditingTurf(turf);
  };

  const handleSaveEdit = async (updatedTurf, turfId) => {
    try {
      await editTurf(updatedTurf, turfId);
      setEditingTurf(null);
      toast.success("Turf updated successfully!");
    } catch (error) {
      toast.error("Failed to update turf");
      console.error("Error updating turf:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTurf(null);
  };

  const handleDelete = async (turfId) => {
    if (window.confirm("Are you sure you want to delete this turf?")) {
      try {
        await deleteTurf(turfId);
        toast.success("Turf deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete turf");
        console.error("Error deleting turf:", error);
      }
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Turf Management</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-full">
              <TurfCardSkeleton />
            </div>
          ))}
        </div>
      ) : turfs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {turfs.map((turf) => (
            <div key={turf._id} className="w-full">
              {editingTurf && editingTurf._id === turf._id ? (
                <EditTurfForm
                  turf={editingTurf}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                  turfId={turf._id}
                />
              ) : (
                <TurfCard
                  turf={turf}
                  onEdit={() => handleEdit(turf)}
                  onDelete={() => handleDelete(turf._id)}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No turfs available.
        </div>
      )}
    </div>
  );
};

export default TurfManagement;
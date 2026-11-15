import { useMemo } from "react";
import useOwners from "@hooks/admin/useOwners";
import OwnersSkeleton from "./OwnersSkeleton";
import Ledger from "@components/common/Ledger";

const OwnerViewer = () => {
  const { owners, loading } = useOwners();

  const rows = useMemo(
    () =>
      owners.map((o) => ({
        id: o._id,
        name: o.name,
        sub: o.email,
        meta: o.phone,
        status: "Owner",
        date: new Date(o.createdAt),
        to: `/admin/owners/${o._id}/turf`,
        toLabel: "View turfs",
      })),
    [owners]
  );

  if (loading) return <OwnersSkeleton />;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl uppercase">Owners</h1>
        <p className="opacity-70">Approved turf owners</p>
      </div>
      <Ledger rows={rows} noun="owner" headers={["Name", "Phone"]} />
    </div>
  );
};

export default OwnerViewer;

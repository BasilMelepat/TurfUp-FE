import { useMemo } from "react";
import { format } from "date-fns";
import useUsers from "@hooks/admin/useUsers";
import UserSkeleton from "./UserSkeleton";
import Ledger from "@components/common/Ledger";

const UserPage = () => {
  const { users, loading } = useUsers();

  const rows = useMemo(
    () =>
      users.map((u) => ({
        id: u.id,
        name: u.name,
        sub: u.email,
        meta: `Joined ${format(new Date(u.createdAt), "d MMM yyyy")}`,
        status: "Active",
        date: new Date(u.createdAt),
      })),
    [users]
  );

  if (loading) return <UserSkeleton />;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl uppercase">Users</h1>
        <p className="opacity-70">Everyone who has booked on TurfUp</p>
      </div>
      <Ledger rows={rows} noun="user" headers={["Name", "Joined"]} />
    </div>
  );
};

export default UserPage;

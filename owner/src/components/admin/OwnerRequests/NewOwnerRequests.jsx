import React from "react";
import useOwnerRequests from "@hooks/admin/useOwnerRequests";
import RequestTabs from "./RequestTabs";
// import useOwnerRequests from "../../../hooks/admin/useOwnerRequests";
import OwnerRequestCard from "./OwnerRequestsCard";
import OwnerRequestsSkeleton from "./OwnerRequestSkeleton";
import OwnerRequestSearch from "./OwnerRequestSearch";

const NewOwnerRequests = () => {
  const {
    requests,
    loading,
    handleAccept,
    handleReject,
    requestId,
    searchTerm,
    handleSearch,
  } = useOwnerRequests();

  if (loading) return <OwnerRequestsSkeleton />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl uppercase mb-4">
        New Owner Requests
      </h1>
      <RequestTabs />
      <div className="mb-6">
        <OwnerRequestSearch
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          
        />
      </div>
      {requests.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <span>No new owner requests at the moment.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <OwnerRequestCard
              key={request._id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
              isProcessing={requestId === request._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewOwnerRequests;

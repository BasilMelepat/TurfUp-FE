import React from "react";
import useOwnerRequests from "@hooks/admin/useOwnerRequests";
import OwnerRequestCard from "./OwnerRequestsCard";
import OwnerRequestsSkeleton from "./OwnerRequestSkeleton";
import OwnerRequestSearch from "./OwnerRequestSearch";
import RequestTabs from "./RequestTabs";

const RejectedOwnerRequests = () => {
  const {
    rejectedRequests,
    loading,
    handleReconsider,
    requestId,
    searchTerm,
    handleSearch,
  } = useOwnerRequests();

  if (loading) return <OwnerRequestsSkeleton />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl uppercase mb-4">
        Rejected Owner Requests
      </h1>
      <RequestTabs />
      <div className="mb-6">
        <OwnerRequestSearch
          searchTerm={searchTerm}
          handleSearch={handleSearch}
        />
      </div>
      {rejectedRequests.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <span>No rejected owner requests at the moment.</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rejectedRequests.map((request) => (
            <OwnerRequestCard
              key={request._id}
              request={request}
              onReconsider={handleReconsider}
              isProcessing={requestId === request._id}
              isRejected={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedOwnerRequests;

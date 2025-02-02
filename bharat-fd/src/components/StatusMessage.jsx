import React from "react";
import { AlertCircle } from "lucide-react";

const StatusMessages = ({ error, success }) => {
  return (
    <>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
          <p className="text-green-600">{success}</p>
        </div>
      )}
    </>
  );
};

export default StatusMessages;

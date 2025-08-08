import React, { useEffect, useState } from "react";
import { replicaService } from "../services/replicaService";
import { useReplicaContext } from "../context/ReplicaContext";

const ReplicaSelectorModal = () => {
  const { replicas, setReplicas, selectedReplica, setSelectedReplica } = useReplicaContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReplicas = async () => {
      try {
        const data = await replicaService.getReplicas();
        setReplicas(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReplicas();
  }, [setReplicas]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Select Replica</h2>
          </div>

          {/* Body */}
          <div className="p-6">
            {loading ? (
              <p>Loading replicas...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Available Replicas</div>

                {replicas?.map((replica) => {
                  const isSelected = selectedReplica?.uuid === replica.uuid;

                  return (
                    <div
                      key={replica.uuid}
                      onClick={() => setSelectedReplica(replica)}
                      className={`flex items-start space-x-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? "bg-black text-white" : "bg-gray-50 hover:bg-gray-100"}`}>
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${isSelected ? "bg-white text-black" : "bg-gray-300 text-gray-700"}`}>
                        {replica.name.charAt(0)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium ${isSelected ? "text-white" : "text-gray-900"}`}>{replica.name}</div>
                        <div className={`text-sm mt-1 ${isSelected ? "text-gray-300" : "text-gray-500"}`}>{replica.shortDescription}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100">
            <button
              onClick={handleConfirmSelect}
              disabled={!selectedReplica}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${selectedReplica ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
              Select
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ReplicaSelectorModal;

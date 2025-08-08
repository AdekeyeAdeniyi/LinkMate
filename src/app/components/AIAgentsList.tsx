import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AIAgentSidebarProps } from "./types";
import Image from "next/image";
import { useReplicaContext } from "../context/ReplicaContext";

const AIAgentSidebar: React.FC<AIAgentSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { replicas, selectedReplica, setSelectedReplica } = useReplicaContext();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsCollapsed(mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setIsCollapsed]);

  return (
    <div className={`${isCollapsed ? "w-16 md:w-20" : "w-80"} absolute top-0 bottom-0 left-0 bg-gray-100 border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out z-30`}>
      {/* Toggle Button */}
      <div className="absolute -right-3 top-6 z-10">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
          {isCollapsed ? <ChevronRight className="w-3 h-3 text-gray-600" /> : <ChevronLeft className="w-3 h-3 text-gray-600" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
        <div className={`${isCollapsed ? "px-2 md:px-3" : "px-4 md:px-6"} py-4 transition-all duration-300`}>
          {!isCollapsed && <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Available Replicas</h3>}
          <div className="space-y-2">
            {replicas &&
              replicas.map((replica) => (
                <div
                  onClick={() => setSelectedReplica(replica)}
                  key={replica?.uuid}
                  className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} p-2 rounded-xl cursor-pointer transition-all duration-200 group relative `}
                  title={isCollapsed ? replica?.name : ""}>
                  <div className="relative">
                    <div className={`w-8 h-8 relative rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                      <Image src={replica.profileImage} alt="replica-image" width={100} height={100} className="w-full object-cover" />
                    </div>
                    {selectedReplica?.uuid == replica.uuid && <div className="absolute -top-1 -right-1 bg-green-400 w-3 h-3 rounded-full"></div>}
                  </div>

                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{replica?.name}</div>
                      <div className="text-xs text-gray-500 truncate">{replica?.shortDescription}</div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentSidebar;

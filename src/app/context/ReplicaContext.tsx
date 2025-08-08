"use client";
import { createContext, useContext, useState } from "react";
import { Replica } from "../components/types";

interface ReplicaContextType {
  replicas: Replica[] | null;
  setReplicas: (replicas: Replica[] | null) => void;

  selectedReplica: Replica | null;
  setSelectedReplica: (replica: Replica | null) => void;
}

// Create context with default empty values
const ReplicaContext = createContext<ReplicaContextType>({
  replicas: null,
  setReplicas: () => {},

  selectedReplica: null,
  setSelectedReplica: () => {},
});

// Provider component
export const ReplicaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [replicas, setReplicas] = useState<Replica[] | null>(null);
  const [selectedReplica, setSelectedReplica] = useState<Replica | null>(null);

  return <ReplicaContext.Provider value={{ replicas, setReplicas, selectedReplica, setSelectedReplica }}>{children}</ReplicaContext.Provider>;
};

export const useReplicaContext = () => useContext(ReplicaContext);

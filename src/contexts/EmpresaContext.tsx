import { createContext, useContext, ReactNode } from "react";
import type { EmpresaData } from "@/types/empresa";

interface EmpresaContextType {
  empresaData: EmpresaData | undefined;
  isLoading: boolean;
  error: Error | null;
}

const EmpresaContext = createContext<EmpresaContextType | undefined>(undefined);

interface EmpresaProviderProps {
  children: ReactNode;
  empresaData: EmpresaData | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const EmpresaProvider = ({
  children,
  empresaData,
  isLoading,
  error
}: EmpresaProviderProps) => {
  return (
    <EmpresaContext.Provider value={{ empresaData, isLoading, error }}>
      {children}
    </EmpresaContext.Provider>
  );
};

export const useEmpresa = () => {
  const context = useContext(EmpresaContext);
  if (context === undefined) {
    throw new Error("useEmpresa debe usarse dentro de un EmpresaProvider");
  }
  return context;
};

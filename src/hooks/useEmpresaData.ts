import { useQuery } from "@tanstack/react-query";
import type { EmpresaResponse } from "@/types/empresa";

const fetchEmpresaData = async (): Promise<EmpresaResponse> => {
  const response = await fetch("https://rayuela.com.mx/empresa/datos");

  if (!response.ok) {
    throw new Error("Error al obtener datos de la empresa");
  }

  return response.json();
};

export const useEmpresaData = () => {
  return useQuery({
    queryKey: ["empresaData"],
    queryFn: fetchEmpresaData,
    staleTime: 1000 * 60 * 60, // Los datos se consideran frescos por 1 hora
    retry: 3,
  });
};

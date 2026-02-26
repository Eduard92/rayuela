import { useQuery } from "@tanstack/react-query";
import type { EmpresaResponse } from "@/types/empresa";
// const CACHE_KEY = "empresaData_cache";
// const CACHE_TTL = 1000 * 60 * 5; // 5 minutos
// const getCachedData = (): EmpresaResponse | undefined => {
//   try {
//     const raw = localStorage.getItem(CACHE_KEY);
//     if (!raw) return undefined;
//     const { data, timestamp } = JSON.parse(raw);
//     if (Date.now() - timestamp > CACHE_TTL) {
//       localStorage.removeItem(CACHE_KEY);
//       return undefined;
//     }
//     return data;
//   } catch {
//     return undefined;
//   }
// };
// const setCachedData = (data: EmpresaResponse) => {
//   try {
//     localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
//   } catch {
//     // localStorage lleno o no disponible
//   }
// };
const fetchEmpresaData = async (): Promise<EmpresaResponse> => {
  const response = await fetch("https://admin.rayuela.com.mx/api/empresa");
  if (!response.ok) {
    throw new Error("Error al obtener datos de la empresa");
  }
  const data = await response.json();
  return data;
};
export const useEmpresaData = () => {
  return useQuery({
    queryKey: ["empresaData"],
    queryFn: fetchEmpresaData,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 3,
  });
};
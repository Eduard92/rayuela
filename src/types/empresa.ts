export interface Horario {
  label: string;
  hora: string;
  cerrado: 0 | 1;
}

export interface EmpresaData {
  direccion: string;
  telefono: string;
  whatsapp: string;
  contacto: string;
  facebook: string;
  instagram: string;
  maps: string;
  id: number;
  slogan: string;
  horarios: Horario[];
}

export interface EmpresaResponse {
  ok: boolean;
  data: EmpresaData;
}

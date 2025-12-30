export type FavelaMeta = {
  id: string;
  nome: string;
  nome_secundario: string;
  entidade: "Favela";
  icon: string;
  color: string;

  bbox: [number, number, number, number];
  centroid: [number, number];
  dist_se_m: number;
  area_m2: number;

  bb_normalizado: [number, number, number, number, number, number];
  resolucao: number;
  offset: [number, number, number];

  periodos: number[];
  point_count: number;

  src: string;
  versao_flaz: string;
  data_geracao: string;
};

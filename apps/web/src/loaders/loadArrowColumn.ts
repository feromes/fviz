import { tableFromIPC } from "apache-arrow";

export async function loadArrowColumn(
  url: string,
  columnName: string
): Promise<Uint8Array | Float32Array> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao carregar Arrow: " + url);
  }

  const buffer = await res.arrayBuffer();
  const table = tableFromIPC(new Uint8Array(buffer));

  // 🔍 encontra o índice da coluna pelo nome
  const fieldIndex = table.schema.fields.findIndex(
    (f) => f.name === columnName
  );

  if (fieldIndex === -1) {
    throw new Error(`Coluna '${columnName}' não encontrada em ${url}`);
  }

  const column = table.getChildAt(fieldIndex);
  if (!column) {
    throw new Error(`Falha ao acessar coluna '${columnName}'`);
  }

  // 🔑 retorna o array tipado real (Uint8Array no seu caso)
  return column.toArray();
}

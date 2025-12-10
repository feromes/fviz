import { tableFromIPC } from "apache-arrow";

export async function loadArrow(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao carregar Arrow: " + url);
  }

  const buffer = await res.arrayBuffer();
  const table = tableFromIPC(new Uint8Array(buffer));

  return table;
}

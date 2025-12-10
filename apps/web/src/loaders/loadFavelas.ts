export async function loadFavelas() {
  const res = await fetch("/data/favelas.json");
  if (!res.ok) {
    console.error("Erro ao carregar favelas.json");
    return [];
  }
  return await res.json();
}

import { loadArrow } from "./loaders/loadArrow";

export async function testArrow() {
  const table = await loadArrow("/data/sao_remo_2017.arrow");

  const colX = table.getChild("x");
  const colY = table.getChild("y");
  const colZ = table.getChild("z");

  const xs = colX.data[0].values;
  const ys = colY.data[0].values;
  const zs = colZ.data[0].values;
}

import { loadArrow } from "./loaders/loadArrow";

export async function testArrow() {
  const table = await loadArrow("/data/sao_remo_2017.arrow");

  console.log("COLUMNS:", table.schema.fields.map(f => f.name));

  const colX = table.getChild("x");
  const colY = table.getChild("y");
  const colZ = table.getChild("z");

  const xs = colX.data[0].values;
  const ys = colY.data[0].values;
  const zs = colZ.data[0].values;

  console.log("x[0..10]", xs.slice(0, 10));
  console.log("y[0..10]", ys.slice(0, 10));
  console.log("z[0..10]", zs.slice(0, 10));
}

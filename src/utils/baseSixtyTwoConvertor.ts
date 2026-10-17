import map from "./map.js";

export default function baseSixtyTwoConvertor(uid: bigint): string {
  const ZERO = BigInt(0);
  const BASE = BigInt(62);

  if (uid === ZERO) return String(map.get(ZERO));

  let shortCode = "";
  while (uid > ZERO) {
    shortCode = map.get(uid % BASE) + shortCode;
    uid = uid / BASE;
  }
  return shortCode;
}

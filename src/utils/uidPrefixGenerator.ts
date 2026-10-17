import { dataCenterId, machineId } from "../config.js";

export default function uidPrefixGenerator() {
  let timestampBits = BigInt(Date.now());
  let uidPrefix =
    (BigInt(timestampBits) << BigInt(22)) |
    (BigInt(dataCenterId) << BigInt(17)) |
    (BigInt(machineId) << BigInt(12));
  return uidPrefix;
}

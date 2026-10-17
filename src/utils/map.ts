const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const map = new Map([...chars].map((char, i) => [BigInt(i), char]));

export default map;

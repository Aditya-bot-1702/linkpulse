import { type Request, type Response, type NextFunction } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import uidPrefixGenerator from "../utils/uidPrefixGenerator.js";
import conn from "../utils/db.js";
import map from "../utils/map.js";
import baseSixtyTwoConvertor from "../utils/baseSixtyTwoConvertor.js";

export let sequenceNumber = BigInt(0);

export const createShortUrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let uidPrefix = uidPrefixGenerator();
  let uid = uidPrefix | BigInt(sequenceNumber);
  let shortCode = baseSixtyTwoConvertor(uid);
  const sql = "INSERT INTO `urls` VALUES (?,?,?)";
  let longUrl = req.body.url;
  conn.execute<ResultSetHeader>(
    sql,
    [uid, shortCode, longUrl],
    (_err, result) => {
      if (_err) {
        console.log(_err);
        return;
      }
      console.log(result);
    },
  );
  sequenceNumber += BigInt(1);
  res.send(JSON.stringify({ uid: uid.toString(), shortCode }));
};

export const resetSequenceNumber = () => {
  setInterval(() => {
    sequenceNumber = BigInt(0);
    console.log("Reset sequence number.");
  }, 1000000000);
};

export const redirectToOriginalUrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const shortCode = req.params.shortCode;
  const sql = "SELECT long_url FROM `urls` WHERE `short_code`=?";
  conn.execute<RowDataPacket[]>(sql, [shortCode], (_err, result) => {
    if (_err) {
      console.log(_err);
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "url not found" });
    }
    const longUrl = result[0]["long_url"];
    return res.redirect(301, longUrl);
  });
};

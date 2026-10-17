import express from "express";
import bodyParser from "body-parser";
import conn from "./utils/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import { resetSequenceNumber } from "./controllers/urlController.js";
import "dotenv/config";
const port = process.env.PORT || 3000;

let app = express();

resetSequenceNumber();

app.use(bodyParser.json());

app.use("/api/urls", urlRoutes);

conn.query("SELECT 1", (_err) => {
  if (_err) {
    console.log("Can't connect to the db", _err);
    process.exit(1);
  } else {
    console.log("Connected to the db!");
    app.listen(port, () => {
      console.log("Server has started");
    });
  }
});

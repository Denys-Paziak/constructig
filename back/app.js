import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

import authRoutes from "./routes/auth.js";
import siteRoutes from "./routes/site.js";

app.use("/api/auth", authRoutes);
app.use("/api/", siteRoutes);

app.get("/api/", (req, res) => {
  res.send("Welcome to Menualista API");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

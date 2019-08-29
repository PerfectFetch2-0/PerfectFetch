const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const path = require("path");
const locationRouter = require("./Routers/locationControllerRouter");
const userRouter = require("./Routers/userControllerRouter");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/location", locationRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../public/index.html"));
});

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});

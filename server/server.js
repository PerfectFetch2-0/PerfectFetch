const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const PORT = 3000;

const session = require("express-session");
const store = require("./Model/sessionStore");

const locationRouter = require("./Routers/locationRouter");
const userRouter = require("./Routers/userRouter");
const sessionController = require("./Controllers/sessionController");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    store: store,
    secret: process.env.FOO_COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use("/user", userRouter);
app.use("/location", locationRouter);

app.get("/",  (req, res) => {
  res.sendFile(path.join(__dirname + "../public/index.html"));
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

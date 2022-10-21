const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Jwtauth = require("../middleware/Jwtauth");
const bodyParser = require("body-parser");
const authcontroller = require("../controllers/authcontroller");
const groupcontroller = require("../controllers/groupcontroller");
const joincontroller = require("../controllers/joincontroller");
const connectioncontroller = require("../controllers/connectioncontroller");
const chatcontroller = require("../controllers/chatcontroller");
const PORT = 3000;
const MONGODB_URI =
  "mongodb+srv://smrh1379:97319731@cluster0.hz1ki.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});
app.post("/api/v1/auth/signup", authcontroller.signup);
app.post("/api/v1/auth/login", authcontroller.login);
app.post("/api/v1/groups", [Jwtauth.verifyToken], groupcontroller.createGroup);
app.get("/api/v1/groups", [Jwtauth.verifyToken], groupcontroller.showAllGroups);
app.get("/api/v1/groups/my", [Jwtauth.verifyToken], groupcontroller.userGroup);
app.post(
  "/api/v1/join_requests",
  [Jwtauth.verifyToken],
  joincontroller.setRequest
);
app.post(
  "/api/v1/join_requests/accept",
  [Jwtauth.verifyToken],
  joincontroller.acceptRequest
);
app.get(
  "/api/v1/join_requests/group",
  [Jwtauth.verifyToken],
  joincontroller.getRequestsByGroup
);
app.get(
  "/api/v1/join_requests",
  [Jwtauth.verifyToken],
  joincontroller.getRequests
);
app.post(
  "/api/v1/connection_requests",
  [Jwtauth.verifyToken],
  connectioncontroller.setRequest
);
app.get(
  "/api/v1/connection_requests",
  [Jwtauth.verifyToken],
  connectioncontroller.getRequest
);
app.post(
  "/api/v1/connection_requests/accept",
  [Jwtauth.verifyToken],
  connectioncontroller.setAcceptreq
);
app.post(
  "/api/v1/chats/:user_id",
  [Jwtauth.verifyToken],
  chatcontroller.sendMessage
);
app.get(
  "/api/v1/chats/:user_id",
  [Jwtauth.verifyToken],
  chatcontroller.getChatPerUser
);
app.get("/api/v1/chats", [Jwtauth.verifyToken], chatcontroller.getAllChat);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(PORT);
    console.log(`Server is running on port ${PORT}.`);
  })
  .catch((err) => {
    console.log({ error: { message: "Server cannot connect to database" } });
  });

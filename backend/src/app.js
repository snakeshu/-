const express = require("express");
const cors = require("cors");
const Routes = require("./routes/index");

const App = express();
App.use(cors());
App.use("/api", Routes);

App.listen(3001, () => {
  console.log("后端服务已启动，端口 3001");
});

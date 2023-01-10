const express = require("express");
const time = require("./routes/time");
const data = require("./routes/data");

const app = express();
app.use(express.json());

app.use("/time", time);
app.use("/data", data);

const port = process.env.PORT || 9001;

app.listen(port, () => console.log(`Listening to port ${port}`));

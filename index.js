const express = require("express");
const time = require("./routes/time");
const data = require("./routes/data");
const cors = require("cors");
const { default: mongoose } = require('mongoose');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
} 

app.use(cors(corsOptions));
app.use(express.json());
app.use("/time", time);
app.use("/data", data);

const port = process.env.PORT || 9001;
const db = 'mongodb+srv://Lotus-db:lotus-db@cluster0.jryvxcm.mongodb.net/lotus?retryWrites=true&w=majority'

mongoose
  .connect(db)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.listen(port, () => console.log(`Listening to port ${port}`));

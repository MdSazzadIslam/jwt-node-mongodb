const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// parse requests of content-type - application/json
//app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); // when you test through POSTMAN please send data as [x-www-form-urlencoded]

app.get("/", (req, res) => {
  res.send("API is runninmg");
});

app.use("/api/users", userRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const app = express();
const cors = require("cors");
// configuring the env file and can access the env keys
require("dotenv").config();


// importing the mongodb connection
const mongodbConnection = require("./config/connection");

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
//making products image folder as public
app.use(express.static("productimages"));

mongodbConnection()
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server running at port:", PORT);
    })
  )
  .catch((err) => console.log("failed to connect DataBase", err));

// importing routes
const userRouter = require("./routers/users");
const productRouter = require("./routers/products");
const cartRouter = require("./routers/carts");

app.use("/", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

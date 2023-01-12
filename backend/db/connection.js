const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

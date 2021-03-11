const mongoose = require("mongoose");
config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  console.log(process.env.MONGODB_URI || db);
  try {
    await mongoose.connect(process.env.MONGODB_URI || db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDb connected");
  } catch (error) {
    console.error("MongoDb connection Error due to :" + error.message);
    process.exit(1); // exit with failure
  }
};

module.exports = connectDB;

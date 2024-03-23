import mongoose from "mongoose";

export const connectDB = ()=>{mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todo",
    })
    .then((e) => console.log("db connected"))
    .catch((e) => console.log(e));
}
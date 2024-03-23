import mongoose from "mongoose";

export const connectDB = ()=>{mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todo",
    })
    .then((e) => console.log(`DataBase connected with ${e.connection.host}`))
    .catch((e) => console.log(e));
}
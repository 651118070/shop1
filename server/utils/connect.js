import mongoose from "mongoose";
export const connectDB=(onconnect)=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DB successfully connected")
        onconnect()
    }).catch((e)=>{
        console.log(e)

    })

}
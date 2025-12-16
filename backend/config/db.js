import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connect('mongodb+srv://eliseualbano57_db_user:OXUDGsrax87THYmq@cluster0.kkb78nd.mongodb.net/StyGereciamento')
    .then(() => { console.log('DB Conectado')})
}
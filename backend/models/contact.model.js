import mongoose, {Mongoose, model} from "mongoose";
const contactSchema = new mongoose.Schema
({

    name:{type:String},
    number:{type:Number}
})

export default mongoose.model.contact || mongoose.model('contact', contactSchema)
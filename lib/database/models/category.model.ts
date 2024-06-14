import mongoose,{ Document } from "mongoose";

export interface ICategory extends Document {
    _id: string, 
    name: string,
}

const categorySchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true}
})

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)

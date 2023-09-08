import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    images: [{ type: String }],
    sizes: [{ type: String }],
    colors: [{ type: String }]
})

export default mongoose.model("products", productsSchema)
import mongoose, {Schema, Types} from "mongoose";

const orderSchema = new Schema({
    message: String,
    product: {type: Types.ObjectId, ref: "Product"},
    user: String,
    date: Date,
});

export const Order = mongoose.model("Order", orderSchema, "orders");

const productSchema = new Schema({
    productName: String,
    description: String,
});

export const Product = mongoose.model("Product", productSchema, "products");







import mongoose from "mongoose";

const estateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    dateD: { type: Number, required: true, default: 1 },
    dateM: { type: Number, required: true, default: 1 },
    dateY: { type: Number, required: true, default: 1 },
    netM: { type: String, required: true },
    brutM: { type: String, required: true },
    roomC: { type: String, required: true },
    aidat: { type: String, required: true },
    furnished: { type: Boolean, required: true, default: false },
    floor: { type: String, required: true },
    park: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    imagelink1: { type: String, required: false, default: null },
    imagelink2: { type: String, required: false, default: null },
    imagelink3: { type: String, required: false, default: null },
    imagelink4: { type: String, required: false, default: null },
})

estateSchema.pre("save", function (next) {
    const now = new Date();
    this.dateD = now.getDate();
    this.dateM = now.getMonth() + 1;
    this.dateY = now.getFullYear();
    next()
})

const Estate = mongoose.model("Estate", estateSchema);
export default Estate;  
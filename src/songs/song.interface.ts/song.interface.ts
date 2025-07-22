import mongoose from "mongoose";

export interface ISong {
    _id: mongoose.Types.ObjectId;
    date: Date;
}
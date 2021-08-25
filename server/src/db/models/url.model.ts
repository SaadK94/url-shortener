import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import * as mongoose from "mongoose";

export class Url extends TimeStamps {
  _id: mongoose.Types.ObjectId;

  @prop({ required: true })
  public url: string;

  @prop({ required: true })
  public shortId: string;
}

export const UrlModel = getModelForClass(Url);

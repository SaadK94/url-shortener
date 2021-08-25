import * as mongoose from "mongoose";

export interface UrlDto {
  id: mongoose.Types.ObjectId;
  fullUrl: string;
  shortId: string;
  shortUrl: string;
  createdAt: Date;
}

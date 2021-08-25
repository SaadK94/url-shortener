import { UrlDto } from "../url.dto";
import { Url } from "../../db/models/url.model";

export const mapUrlToDto = (url: Url): UrlDto => {
  return {
    id: url._id,
    fullUrl: url.url,
    shortUrl: `https://pbid.io/${url.shortId}`,
    shortId: url.shortId,
    createdAt: url.createdAt,
  };
};

import { mongoose } from "@typegoose/typegoose";
import { UrlDto } from "../url.dto";
import { mapUrlToDto } from "./map-url-to-dto";
import { Url } from "../../db/models/url.model";

describe("mapUrlToDto", () => {
  const mockId = new mongoose.Types.ObjectId();
  const mockDate = new Date();

  const mockUrl: Url = {
    _id: mockId,
    url: "https://www.google.co.uk/",
    shortId: "abcd1234",
    createdAt: mockDate,
  };

  const mockResult: UrlDto = {
    id: mockId,
    fullUrl: "https://www.google.co.uk/",
    shortUrl: "https://pbid.io/abcd1234",
    shortId: "abcd1234",
    createdAt: mockDate,
  };

  it("transforms the URL to the DTO", () => {
    expect(mapUrlToDto(mockUrl)).toEqual(mockResult);
  });
});

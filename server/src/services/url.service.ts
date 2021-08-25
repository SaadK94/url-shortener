import ShortUniqueId from "short-unique-id";
import { UrlDto } from "../dtos/url.dto";
import { UrlModel } from "../db/models/url.model";
import { mapUrlToDto } from "../dtos/helpers/map-url-to-dto";

const uid = new ShortUniqueId({
  dictionary: "alphanum_lower",
  length: 8,
});

/**
 * Class for Url Service containing business logic
 */
export class UrlService {
  private readonly urlModel: typeof UrlModel;

  constructor(model: typeof UrlModel) {
    this.urlModel = model;
  }
  /**
   * Get all urls
   */
  async get(): Promise<UrlDto[]> {
    const urls = await this.urlModel.find({}).exec();
    return urls.map((x) => mapUrlToDto(x));
  }

  /**
   * Add new url
   */
  async add(newUrl: string): Promise<UrlDto> {
    const shortId = await this.getUniqueShortId();
    const url = await this.urlModel.create({ url: newUrl, shortId });
    return mapUrlToDto(url);
  }

  /**
   * Delete by id
   */
  async deleteById(_id: string): Promise<boolean> {
    const result = await this.urlModel.deleteOne({ _id }).exec();
    return !!result.deletedCount;
  }

  /**
   * Get unique shortId
   */
  async getUniqueShortId(): Promise<string> {
    let shortId: string;
    let exists = true;
    while (exists) {
      shortId = uid();
      const foundId = await this.urlModel
        .findOne({
          shortId: shortId,
        })
        .exec();
      if (!foundId) {
        exists = false;
        break;
      }
    }
    return shortId;
  }
}

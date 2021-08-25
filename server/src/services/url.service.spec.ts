import { UrlService } from "./url.service";
import { mongoose } from "@typegoose/typegoose";
import { mapUrlToDto } from "../dtos/helpers/map-url-to-dto";
import { Url } from "../db/models/url.model";

describe("UrlService", () => {
  let service: UrlService;

  const urls: Url[] = [
    {
      _id: new mongoose.Types.ObjectId(),
      url: "https://www.google.co.uk/",
      shortId: "abcd1234",
      createdAt: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId(),
      url: "https://primarybid.com/home/",
      shortId: "abcd9876",
      createdAt: new Date(),
    },
  ];
  const mappedUrls = urls.map((x) => mapUrlToDto(x));

  const mockExec = jest.fn();
  const mockUrlModel = {
    find: jest.fn(() => ({
      exec: mockExec,
    })),
    create: jest.fn(),
    deleteOne: jest.fn(() => ({
      exec: mockExec,
    })),
    findOne: jest.fn(() => ({
      exec: mockExec,
    })),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UrlService(mockUrlModel as any);
  });

  describe("get", () => {
    it("should call the correct method for the repository and return the urls", async () => {
      mockExec.mockImplementation(() => Promise.resolve(urls));
      const result = await service.get();

      expect(mockUrlModel.find).toHaveBeenCalledWith({});
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual(mappedUrls);
    });
  });

  describe("add", () => {
    it("should call the correct method for the repository and return added url", async () => {
      const { url, shortId } = urls[0];
      const spiedGetUniqueShortId = jest
        .spyOn(service, "getUniqueShortId")
        .mockImplementation(() => Promise.resolve(shortId));
      mockUrlModel.create.mockImplementation(() => Promise.resolve(urls[0]));
      const result = await service.add(url);

      expect(spiedGetUniqueShortId).toHaveBeenCalled();
      expect(mockUrlModel.create).toHaveBeenCalledWith({ url, shortId });
      expect(result).toEqual(mappedUrls[0]);
    });
  });

  describe("deleteById", () => {
    it("should call the correct method for the repository and return the response", async () => {
      const id = urls[0]._id.toString();
      mockExec.mockImplementation(() => Promise.resolve({ deletedCount: 1 }));
      const result = await service.deleteById(id);

      expect(mockUrlModel.deleteOne).toHaveBeenCalledWith({ _id: id });
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual(true);
    });
  });

  describe("getUniqueShortId", () => {
    it("should return a unique 8 character short Id", async () => {
      let count = 0;
      mockExec.mockImplementation(
        () =>
          new Promise((resolve) => {
            if (count < 3) {
              count++;
              return resolve({ _id: "123" });
            }
            return resolve(null);
          })
      );
      const result = await service.getUniqueShortId();

      expect(mockUrlModel.findOne).toHaveBeenCalledTimes(4);
      expect(mockExec).toHaveBeenCalledTimes(4);
      expect(result.length).toEqual(8);
    });
  });
});

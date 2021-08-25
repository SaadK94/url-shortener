import { UrlController } from "./url.controller";
import mongoose from "mongoose";
import { UrlDto } from "../dtos/url.dto";

describe("UrlController Unit Tests", () => {
  let controller: UrlController;
  const urls: UrlDto[] = [
    {
      id: new mongoose.Types.ObjectId(),
      fullUrl: "https://www.google.co.uk/",
      shortId: "abcd1234",
      shortUrl: "https://pbid.io/abcd1234",
      createdAt: new Date(),
    },
    {
      id: new mongoose.Types.ObjectId(),
      fullUrl: "https://primarybid.com/home/",
      shortId: "abcd9876",
      shortUrl: "https://pbid.io/abcd9876",
      createdAt: new Date(),
    },
  ];
  const mockSend = jest.fn();
  const mockJson = jest.fn();
  const mockRes = {
    status: jest.fn(() => ({
      send: mockSend,
      json: mockJson,
    })),
  };
  const mockReq = {
    body: {
      url: "https://www.google.co.uk/",
    },
    params: {
      id: new mongoose.Types.ObjectId(),
    },
  };

  const mockUrlService = {
    get: jest.fn(() => Promise.resolve(urls)),
    add: jest.fn(() => Promise.resolve(urls[0])),
    deleteById: jest.fn(() => Promise.resolve(true)),
  };

  beforeEach(() => {
    controller = new UrlController(mockUrlService as any);
  });

  describe("get", () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      await controller.get({} as any, mockRes as any, {} as any);
    });

    it("calls the relevant service method", () => {
      expect(mockUrlService.get).toHaveBeenCalled();
    });

    it("gives the correct response and returns the urls", () => {
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith(urls);
    });
  });

  describe("add", () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      await controller.add(mockReq as any, mockRes as any, {} as any);
    });

    it("calls the relevant service method", () => {
      const url = mockReq.body.url;
      expect(mockUrlService.add).toHaveBeenCalledWith(url);
    });

    it("gives the correct response and returns the url", () => {
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(urls[0]);
    });
  });

  describe("deleteById", () => {
    const id = mockReq.params.id;
    beforeEach(async () => {
      jest.clearAllMocks();
      await controller.deleteById(mockReq as any, mockRes as any, {} as any);
    });

    it("calls the relevant service method", () => {
      expect(mockUrlService.deleteById).toHaveBeenCalledWith(id);
    });

    it("deletes a url when present in database", () => {
      const json = {
        message: `Successfully deleted url with id: ${id}`,
      };
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(json);
    });
  });

  describe("deleteById (failed)", () => {
    const id = mockReq.params.id;
    beforeEach(async () => {
      jest.clearAllMocks();
      mockUrlService.deleteById.mockImplementation(() =>
        Promise.resolve(false)
      );
      await controller.deleteById(mockReq as any, mockRes as any, {} as any);
    });

    it("returns error message if not in database", () => {
      const json = {
        message: `Url with id: ${id} not found!`,
      };
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith(json);
    });
  });
});

import { RequestHandler } from "express";
import { UrlService } from "../services/url.service";

export class UrlController {
  private readonly urlService: UrlService;

  constructor(service: UrlService) {
    this.urlService = service;
  }

  /**
   * Get all urls
   */
  get: RequestHandler = async (req, res) => {
    const urlDtos = await this.urlService.get();
    return res.status(200).send(urlDtos);
  };

  /**
   * Add a new url
   */
  add: RequestHandler = async (req, res) => {
    const newUrl: string = req.body.url;
    const urlDto = await this.urlService.add(newUrl);
    return res.status(201).json(urlDto);
  };

  /**
   * Delete one by id
   */
  deleteById: RequestHandler = async (req, res) => {
    const urlId: string = req.params.id;
    const deleted = await this.urlService.deleteById(urlId);
    if (!deleted) {
      return res.status(404).json({
        message: `Url with id: ${urlId} not found!`,
      });
    }
    return res.status(200).json({
      message: `Successfully deleted url with id: ${urlId}`,
    });
  };
}

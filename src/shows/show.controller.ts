import { Response, Request } from "express";
import ShowService from "./show.service";
const showService = new ShowService();
class ShowController {
  public createMany = async (req: Request, res: Response) => {
    const message = await showService.saveMany(req.body);
    res.send(message);
  };

  public find = async (req: Request, res: Response) => {
    const data = await showService.findAll();
    res.send(data);
  };

  public findRecommended = async (req: Request, res: Response) => {
    const data = await showService.findAll();
    const newData = data.filter((element) => {
      return !element.thumbnail.trending;
    });
    res.send(newData);
  };
  public findTrending = async (req: Request, res: Response) => {
    const data = await showService.findAll();
    const newData = data.filter((element) => {
      return element.thumbnail.trending;
    });
    res.send(newData);
  };
  public findMovies = async (req: Request, res: Response) => {
    const data = await showService.findAll();
    const newData = data.filter((element) => {
      return element.category === "Movie";
    });
    res.send(newData);
  };
  public findSeries = async (req: Request, res: Response) => {
    const data = await showService.findAll();
    const newData = data.filter((element) => {
      return element.category === "TV Series";
    });
    res.send(newData);
  };
}

export default ShowController;

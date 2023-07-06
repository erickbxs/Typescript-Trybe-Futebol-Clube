import { Request, Response } from 'express';
import HomeService from '../services/home.service';
import AwayService from '../services/away.service';

class HomeController {
  constructor(
    private homeService = new HomeService(),
    private awayService = new AwayService(),
  ) {}

  public async getHomeBoard(_req: Request, res: Response) {
    try {
      const cardBoard = await this.homeService.homeBoard();
      if (!cardBoard) {
        return res.status(404).json({ message: 'No home board found' });
      }
      return res.status(200).json(cardBoard);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getAwayBoard(_req: Request, res: Response) {
    try {
      const cardBoard = await this.awayService.awayBoard();
      if (!cardBoard) {
        return res.status(404).json({ message: 'No away board found' });
      }
      return res.status(200).json(cardBoard);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server Error' });
    }
  }
}

export default HomeController;

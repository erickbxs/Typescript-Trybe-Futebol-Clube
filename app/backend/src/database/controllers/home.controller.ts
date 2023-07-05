import { Request, Response } from 'express';
import HomeService from '../services/home.service';
import AwayService from '../services/away.service';
import LeaderBoardService from '../services/leaderboard.service';

class HomeController {
  constructor(
    private homeService = new HomeService(),
    private awayService = new AwayService(),
    private leaderBoardService = new LeaderBoardService(),
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

  public async getLeaderBoard(_req: Request, res: Response) {
    try {
      const cardBoard = await this.leaderBoardService.leaderBoard();
      if (!cardBoard) {
        return res.status(404).json({ message: 'No leader board found' });
      }
      return res.status(200).json(cardBoard);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default HomeController;

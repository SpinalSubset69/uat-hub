import { Response } from 'express';

export abstract class BaseController {
  protected handleErrorOnRequest(ex: any, res: Response) {
    const statusCode = ex.message === 'duplicate' ? 500 : 404;

    return res.status(statusCode).json({
      message: 'An Error Ocurred',
      error: ex.message,
    });
  }
}

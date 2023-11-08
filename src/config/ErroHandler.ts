import e, { Request, Response, NextFunction } from 'express';
import ErrorResponse from './ErrorResponse';
import { logger } from './AppLogger';

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Error"
  if(err.error != null){
    logger.error(err.error)
  }
  res.status(status).send({ 
    message: message
  });
  
}

export default errorHandler;
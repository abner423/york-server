import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtRequest } from './JwtRequest';

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    jwt.verify(token, process.env.SECRET_JWT!);
    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};

export const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decodedUser = jwt.verify(token, process.env.SECRET_JWT!) as JwtRequest;

    if (!decodedUser.isAdmin) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).send({ message: 'Please authenticate' });
  }
};
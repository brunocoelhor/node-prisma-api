import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token missing'
    });
  }

  const [,token] = authHeader.split(' ');
  
  try {
    const { sub } = verify(token, 'e58136588a5a91ce799f6bf3b33973a7') as IPayLoad;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Invalid token'
    });
  }
}
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import config from '../config/keys';

declare global {
    namespace Express {
      interface Request {
        user?: any; 
      }
    }
  }

export const authMiddleware = (request: Request<{id:number}>, response: Response, next: NextFunction) => {

  const authorizationHeader = request.header('Authorization');

if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return response.status(401).json({ msg: 'No token, authorization denied' });
}


const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return response.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { user: any };
    request.user = decoded.user;
    next();
  } catch (err) {
    response.status(401).json({ msg: 'Token is not valid' });
  }
};


export const isAdmin = (request: Request<{id:number}>, response: Response, next: NextFunction) => {

  const authorizationHeader = request.header('Authorization');

if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'No token, authorization denied' });
}


const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return response.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { user: any };
    request.user = decoded.user;
    if(request.user.role!='admin'){
      return response.status(401).json({message:'Unauthorized, only admin is authorized'})
    }
    next();
  } catch (err) {
    response.status(401).json({ message: 'Token is not valid' });
  }
};
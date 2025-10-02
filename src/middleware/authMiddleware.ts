import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        role: string;
      };
      if (decoded.role !== role) return res.status(403).json({ error: 'Forbidden' });

      // Explicitly assert the type of `req.user`
      (req as any).user = decoded; // Temporarily use `any` to bypass the error
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

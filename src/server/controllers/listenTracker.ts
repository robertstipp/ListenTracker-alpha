import { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs/promises';

type LogEntry = {
  dateTime: string;
  artist: string;
  track: string;
  ip: string;
}

export const logListen = async (req: Request, res: Response, next : NextFunction) : Promise<void> => {
  const logEntry : LogEntry = {
    ip : req.ip,
    track : "demo track",
    artist : "demo artist",
    dateTime : Date.now().toString()
  }
  
  await fs.appendFile(path.join(__dirname, "../../../data/log.txt"),JSON.stringify(logEntry),'utf-8')


  return next();
}
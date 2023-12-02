import { Request } from "express";

export const getIpAddress = (req: Request) => req.headers.forwarded || req.socket.remoteAddress;
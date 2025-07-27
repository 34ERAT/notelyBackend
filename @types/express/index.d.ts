export {};
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      avatar?: string;
    }
  }
}

import "express";

// to make the file a module and avoid the TypeScript error
export { };

declare global {
  namespace Express {
    interface Response {
      withData<T = any>(data: T, message?: string, statusCode?: number): this;
      withError(error: any, statusCode?: number): this;
    };
  };
};

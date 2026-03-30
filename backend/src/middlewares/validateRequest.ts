import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';

export const validateRequest = (schemas: {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
}) => {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (schemas.body) {
      request.body = schemas.body.parse(request.body);
    }

    if (schemas.params) {
      request.params = schemas.params.parse(request.params);
    }

    if (schemas.query) {
      request.query = schemas.query.parse(request.query);
    }

    next();
  };
};


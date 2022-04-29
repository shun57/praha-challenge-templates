import errorMiddleware from "../error-middleware";
import { UnauthorizedError } from "express-jwt";
// import type { Request, Response, NextFunction } from "express";
import { mockReq, mockRes } from "sinon-express-mock";

describe("errorMiddlewareのテスト", (): void => {
  const req = mockReq();
  const next = jest.fn();
  test("headersSentがある場合、nextメソッドが呼ばれる", (): void => {
    const error = new Error("fail");
    const response = {
      headersSent: true,
      json: jest.fn(),
      status: jest.fn(),
    };
    const res = mockRes(response);
    errorMiddleware(error, req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("headersSentがない場合かつ認証エラーの場合401エラーとなる", (): void => {
    const error = new UnauthorizedError("code", { message: "認証エラー" });
    const response = {
      headersSent: false,
      json: jest.fn(),
      status: jest.fn(),
    };
    const res = mockRes(response);
    errorMiddleware(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      code: error.code,
      message: error.message,
    });
  });

  test("500エラー", (): void => {
    const error = new Error("fail");
    const response = {
      headersSent: false,
      json: jest.fn(),
      status: jest.fn(),
    };
    const res = mockRes(response);
    errorMiddleware(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      stack: error.stack,
      message: error.message,
    });
  });
});

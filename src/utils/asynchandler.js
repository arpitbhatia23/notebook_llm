import { NextResponse } from "next/server";

export const asyncHandler = (handler) => {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      console.log(error);
      return NextResponse.json(error.message || " Internal Server Error", {
        status: error.status || 500,
      });
    }
  };
};

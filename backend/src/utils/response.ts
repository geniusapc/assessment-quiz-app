import { Response } from "express";
import { HttpStatus } from "./httpStatus";

export class ApiResponse {
    static success(
        res: Response,
        data: any,
        message = "Success",
        statusCode: HttpStatus = HttpStatus.OK
    ) {
        return res.status(statusCode).json({
            success: true,
            statusCode,
            message,
            data,
        });
    }

    static error(
        res: Response,
        message = "An error occurred",
        statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    ) {
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
        });
    }
}

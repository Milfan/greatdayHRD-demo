import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    catch(exeption: HttpException, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const statusCode = exeption.getStatus();
        

        const errorResponse = {
            code: statusCode,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exeption.message
        }

        response.status(statusCode).json(errorResponse);
    }
}
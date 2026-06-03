export interface HttpResponse {
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

export class HttpHelper {
  // 400
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static badRequest(body: any): HttpResponse {
    if (typeof body === 'string') {
      return {
        statusCode: 400,
        body: {
          success: false,
          message: body,
        },
      };
    }

    return {
      statusCode: 400,
      body: {
        success: false,
        ...body,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static notFound(body: any): HttpResponse {
    return {
      statusCode: 404,
      body: {
        success: false,
        ...body,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static conflict(body: any): HttpResponse {
    return {
      statusCode: 409,
      body: {
        success: false,
        ...body,
      },
    };
  }

  // 200
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static ok(body: any): HttpResponse {
    return {
      statusCode: 200,
      body: {
        success: true,
        ...body,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static created(body: any): HttpResponse {
    return {
      statusCode: 201,
      body: {
        success: true,
        message: 'Criado com sucesso!',
        ...body,
      },
    };
  }

  // 500
  static serverError(message: string = 'Ocorreu um erro interno no servidor.'): HttpResponse {
    return {
      statusCode: 500,
      body: {
        success: false,
        message,
      },
    };
  }
}

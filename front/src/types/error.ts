type ResponseType = {
  message: string;
};

export type ErrorType = {
  response: {
    data: ResponseType;
    status: number;
  };
};

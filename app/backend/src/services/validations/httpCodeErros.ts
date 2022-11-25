enum statusCode {
  'string.empty' = 400,
  'any.required' = 400,
  'string.email' = 401,
}

const mapStatusCode = (errorType: keyof typeof statusCode): number => {
  const error = statusCode[errorType];
  if (!error) return 500;
  return error;
};

export { mapStatusCode, statusCode };

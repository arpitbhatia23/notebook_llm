export default class apiError extends Error {
  constructor(status, message, error, data, success = false, stack = "") {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
    this.data = data;
    this.success = success;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function CustomError(data, statusCode) {
    let error;

    if (typeof data !== 'string') {
        error = new Error();
        error.data = data;
    } else {
        error = new Error(data);
    }

    error.statusCode = statusCode;
    return error;
}

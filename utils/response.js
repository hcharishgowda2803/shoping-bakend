export const status_message = {
    200: "Success",
    201: "Created",
    202: "Accepted",
    204: "Processed, no content to display",
    301: "Endpoint moved",
    302: "Request can't be fullfiled",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
    413: "Payload too large",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout"
}


export function response(status, result, res) {
    let resp = {
        status: {
            code: status,
            message: status_message[status]
        },
        response: {}
    }

    if (status === 200) {
        resp['response'] = result;
    } else {
        resp['response'] = {
            message:result
        }
    }

    res.status(status).json(resp).end();
}


export function handleError(status,err,res){
   response(status,err,res);
}
/**
 * @author WMXPY
 * @namespace Error
 * @fileoverview Index
 */

export enum ERROR_CODE {
}

export const errorList: {
    [key: number]: string;
} = {
};

/**
 * return new error string object of target error code
 *
 * @param {number} code
 * @returns {Error}
 */
export const error = (code: ERROR_CODE): Error => {
    const newError: Error = new Error();
    if (errorList[code]) {
        newError.message = code + ': ' + errorList[code];
        newError.name = errorList[code];
        (newError as any).code = code;

        return newError;
    }
    newError.message = code + ': ' + errorList[900];
    newError.name = errorList[900];
    (newError as any).code = 900;

    if ((newError as any).code > 900) {
        console.log(newError);
    }

    return newError;
};

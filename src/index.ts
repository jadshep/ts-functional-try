

///////////
// Types //
///////////

export type FailableReturn<TValue, TError = Error> = {
    success: true;
    value: TValue;
    error: undefined;
} | {
    success: false;
    value: undefined;
    error: TError;
};


///////////
// Utils //
///////////

/**
 * Safely executes a function and returns the resulting value or error
 *
 * @param func The function to execute
 * @param args The arguments to pass to the function
 * @returns A `FailableReturn` with the function's return value or thrown error
 */
export function trySync<A extends unknown[], TValue, TError = Error>(func: (...args: A) => TValue, ...args: A): FailableReturn<TValue, TError> {
    try {
        const value = func(...args);

        return {
            success: true,
            value,
            error: undefined,
        };
    }
    catch (err) {
        return {
            success: false,
            value: undefined,
            error: err as TError,
        };
    }
}

/**
 * Wraps a promise and returns the resulting value or error
 *
 * @param promise The promise to handle
 * @returns A `FailableReturn` with the promise's resulting value or error
 */
export function tryAsync<TValue, TError = Error>(promise: Promise<TValue>): Promise<FailableReturn<TValue, TError>> {
    return promise
        .then(function (value: TValue): FailableReturn<TValue, TError> {
            return {
                success: true,
                value,
                error: undefined,
            };
        })
        .catch(function (error: TError): FailableReturn<TValue, TError> {
            return {
                success: false,
                value: undefined,
                error,
            };
        });
}

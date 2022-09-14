

///////////
// Types //
///////////

export type FailableReturn<T> = {
    error: Error;
    value: undefined;
} | {
    error: null;
    value: T;
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
export function trySync<A extends unknown[], R>(func: (...args: A) => R, ...args: A): FailableReturn<R> {
    try {
        const value = func(...args);

        return {
            error: null,
            value,
        };
    }
    catch (err) {
        return {
            error: err as Error,
            value: undefined,
        };
    }
}

/**
 * Wraps a promise and returns the resulting value or error
 *
 * @param promise The promise to handle
 * @returns A `FailableReturn` with the promise's resulting value or error
 */
export function tryAsync<R>(promise: Promise<R>): Promise<FailableReturn<R>> {
    return promise
        .then(function (value) {
            return {
                error: null,
                value,
            };
        })
        .catch(function (error) {
            return {
                error,
                value: undefined,
            };
        });
}

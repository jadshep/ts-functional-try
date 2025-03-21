export namespace FunctionalTry {
    //
    // Types
    //

    export type FailableReturnSuccess<TValue> = {
        readonly success: true;
        readonly failure: false;

        readonly value: TValue;
        readonly error: undefined;
    };

    export type FailableReturnFailure<TError = Error> = {
        readonly success: false;
        readonly failure: true;

        readonly value: undefined;
        readonly error: TError;
    };

    export type FailableReturn<TValue, TError = Error> =
        | FailableReturnSuccess<TValue>
        | FailableReturnFailure<TError>;

    //
    // Internal utils
    //

    export function createSuccess<TValue, TError>(value: TValue): FailableReturn<TValue, TError> {
        return Object.freeze({
            success: true,
            failure: false,

            value,
            error: undefined,
        });
    }

    export function createFailure<TValue, TError>(error: TError): FailableReturn<TValue, TError> {
        return Object.freeze({
            success: false,
            failure: true,

            value: undefined,
            error,
        });
    }

    //
    // Public utils
    //

    /**
     * Safely executes a function and returns the resulting value or error
     *
     * @param func The function to execute
     * @param args The arguments to pass to the function
     * @returns A `FailableReturn` with the function's return value or thrown error
     */
    export function trySync<A extends unknown[], TValue, TError = Error>(
        func: (...args: A) => TValue,
        ...args: A
    ): FailableReturn<TValue, TError> {
        try {
            return createSuccess(func(...args));
        } catch (error) {
            return createFailure(error as TError);
        }
    }

    /**
     * Wraps a promise and returns the resulting value or error
     *
     * @param promise The promise to handle
     * @returns A `FailableReturn` with the promise's resulting value or error
     */
    export function tryAsync<TValue, TError = Error>(
        promise: Promise<TValue>,
    ): Promise<FailableReturn<TValue, TError>> {
        return promise
            .then(createSuccess as typeof createSuccess<TValue, TError>)
            .catch(createFailure as typeof createFailure<TValue, TError>);
    }
}

//
// Exports
//

export type FailableReturn<TValue, TError = Error> = FunctionalTry.FailableReturn<TValue, TError>;
export const trySync = FunctionalTry.trySync;
export const tryAsync = FunctionalTry.tryAsync;

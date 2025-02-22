import { trySync, tryAsync } from '../src/index';

describe('trySync', () => {
    it('should return success for a successful function call', () => {
        const result = trySync((a: number, b: number) => a + b, 1, 2);
        expect(result).toEqual({
            success: true,
            failure: false,
            value: 3,
            error: undefined,
        });
    });

    it('should return failure for a function that throws an error', () => {
        const result = trySync(() => {
            throw new Error('Test error');
        });
        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: new Error('Test error'),
        });
    });

    it('should handle functions with no arguments', () => {
        const result = trySync(() => 42);
        expect(result).toEqual({
            success: true,
            failure: false,
            value: 42,
            error: undefined,
        });
    });

    it('should handle functions that return undefined', () => {
        const result = trySync(() => undefined);
        expect(result).toEqual({
            success: true,
            failure: false,
            value: undefined,
            error: undefined,
        });
    });

    it('should handle functions that return null', () => {
        const result = trySync(() => null);
        expect(result).toEqual({
            success: true,
            failure: false,
            value: null,
            error: undefined,
        });
    });

    it('should handle functions that throw non-error values', () => {
        const result = trySync(() => {
            throw 'Test error';
        });
        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: 'Test error',
        });
    });

    it('should handle functions that throw undefined', () => {
        const result = trySync(() => {
            throw undefined;
        });
        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: undefined,
        });
    });

    it('should handle functions that return objects', () => {
        const result = trySync(() => ({ key: 'value' }));
        expect(result).toEqual({
            success: true,
            failure: false,
            value: { key: 'value' },
            error: undefined,
        });
    });

    it('should handle functions that return arrays', () => {
        const result = trySync(() => [1, 2, 3]);
        expect(result).toEqual({
            success: true,
            failure: false,
            value: [1, 2, 3],
            error: undefined,
        });
    });

    it('should handle functions that throw custom errors', () => {
        class CustomError extends Error {
            constructor(message: string) {
                super(message);
                this.name = 'CustomError';
            }
        }

        const result = trySync(() => {
            throw new CustomError('Custom error message');
        });
        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: new CustomError('Custom error message'),
        });
    });
});

describe('tryAsync', () => {
    it('should return success for a resolved promise', async () => {
        const result = await tryAsync(Promise.resolve(42));
        expect(result).toEqual({
            success: true,
            failure: false,
            value: 42,
            error: undefined,
        });
    });

    it('should return failure for a rejected promise', async () => {
        const result = await tryAsync(Promise.reject(new Error('Test error')));
        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: new Error('Test error'),
        });
    });

    it('should handle promises that resolve to undefined', async () => {
        const result = await tryAsync(Promise.resolve(undefined));
        expect(result).toEqual({
            success: true,
            failure: false,
            value: undefined,
            error: undefined,
        });
    });

    it('should handle promises that reject with non-error values', async () => {
        const result = await tryAsync(Promise.reject('Test error'));
        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: 'Test error',
        });
    });

    it('should handle promises that resolve to null', async () => {
        const result = await tryAsync(Promise.resolve(null));
        expect(result).toEqual({
            success: true,
            failure: false,
            value: null,
            error: undefined,
        });
    });

    it('should handle promises that reject with undefined', async () => {
        const result = await tryAsync(Promise.reject(undefined));
        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: undefined,
        });
    });

    it('should handle promises that resolve to objects', async () => {
        const result = await tryAsync(Promise.resolve({ key: 'value' }));
        expect(result).toEqual({
            success: true,
            failure: false,
            value: { key: 'value' },
            error: undefined,
        });
    });

    it('should handle promises that resolve to arrays', async () => {
        const result = await tryAsync(Promise.resolve([1, 2, 3]));
        expect(result).toEqual({
            success: true,
            failure: false,
            value: [1, 2, 3],
            error: undefined,
        });
    });

    it('should handle promises that reject with custom errors', async () => {
        class CustomError extends Error {
            constructor(message: string) {
                super(message);
                this.name = 'CustomError';
            }
        }

        const result = await tryAsync(Promise.reject(new CustomError('Custom error message')));
        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: new CustomError('Custom error message'),
        });
    });
});

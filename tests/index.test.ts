import { trySync, tryAsync, FailableReturn } from '../src/index';

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
});

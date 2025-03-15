import { trySync, tryAsync } from '../src/index';

describe('trySync', () => {
    it('should return success for a successful function call', () => {
        const result = trySync(JSON.parse, '"Hello"');

        expect(result).toEqual({
            success: true,
            failure: false,
            value: 'Hello',
            error: undefined,
        });
    });

    it('should return failure for a function that throws an error', () => {
        const result = trySync(() => {
            throw new Error('Hello');
        });

        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: new Error('Hello'),
        });
    });
});

describe('tryAsync', () => {
    it('should return success for a resolved promise', async () => {
        const result = await tryAsync(Promise.resolve('Hello'));

        expect(result).toEqual({
            success: true,
            failure: false,
            value: 'Hello',
            error: undefined,
        });
    });

    it('should return failure for a rejected promise', async () => {
        const result = await tryAsync(Promise.reject(new Error('Hello')));

        expect(result).toEqual({
            success: false,
            failure: true,
            value: undefined,
            error: new Error('Hello'),
        });
    });
});

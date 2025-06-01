import fuzz from 'fuzzball';

const SIMILARITY_THRESHOLD = 0.90;

export function fuzzyMatch(a: string, b: string): boolean {
    return fuzz.token_set_ratio(a, b) / 100 >= SIMILARITY_THRESHOLD;
}

export function fuzzyArrayMatch(expected: string[], actual: string[]): boolean {
    return expected.every(exp =>
        actual.some(act => fuzzyMatch(exp, act)));
}
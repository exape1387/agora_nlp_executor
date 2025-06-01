import { runExtraction } from '../src/extractor';
import { fuzzyMatch, fuzzyArrayMatch } from '../src/fuzzyUtils';
import testCases from '../data/test-cases.json';

describe('Medical NLP Extraction - Fuzzy Tests', () => {
    testCases.forEach((testCase) => {
        test(`Test ${testCase.id}`, () => {
            const result = runExtraction(testCase.input, testCase.ambiguous ?? false);
            const expected = testCase.expected;
            expect(result.age).toBe(expected.age);
            expect(result.gender).toBe(expected.gender);
            expect(fuzzyMatch(result.patient_name, expected.patient_name)).toBe(true);
            expect(fuzzyArrayMatch(result.diagnoses, expected.diagnoses ?? [])).toBe(true);
            expect(fuzzyArrayMatch(result.procedures, expected.procedures ?? [])).toBe(true);
            expect(fuzzyArrayMatch(result.medications, expected.medications ?? [])).toBe(true);
        });
    });
});
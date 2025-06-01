import {
    ABBREVIATION_MAP,
    NAME_TYPO_MAP,
    BODY_TYPO_MAP,
    MEDICATION_TYPO_MAP,
    PROCEDURE_TYPO_MAP,
    DIAGNOSIS_TYPO_MAP,
    DIAGNOSES_LIST,
    PROCEDURES_LIST,
    MEDICATIONS_LIST,
    GENDER_TYPO_MAP,
    NEGATION_PATTERNS,
    AMBIGUOUS_PATTERNS,
    extractAge,
    extractGender
} from './normalization';

export function isNegated(text: string, term: string): boolean {
    const termPattern = buildRelaxedPattern(term);
    for (const patternFn of NEGATION_PATTERNS) {
        const regex = patternFn(term);
        const match = text.match(regex);
        if (match) {
            const scope = match[1] && match[2] ? match[2] : match[0];
            if (termPattern.test(scope)) {
                return true;}}}
    return false;
}

export function isAmbiguousContext(text: string, term: string): boolean {
    for (const patternFn of AMBIGUOUS_PATTERNS) {
        const regex = patternFn(term);
        const result = regex.test(text);
        if (result) return true;}
    return false;
}

function applyTypos(text: string, map: Record<string, string>): string {
    for (const [typo, correction] of Object.entries(map)) {
        text = text.replace(new RegExp(`\\b${typo}\\b`, 'gi'), correction);}
    return text;
}

function normalize(text: string): string {
    let result = text;
    result = applyTypos(result, NAME_TYPO_MAP);
    result = applyTypos(result, GENDER_TYPO_MAP);
    result = applyTypos(result, BODY_TYPO_MAP);
    result = applyTypos(result, MEDICATION_TYPO_MAP);
    result = applyTypos(result, PROCEDURE_TYPO_MAP);
    result = applyTypos(result, DIAGNOSIS_TYPO_MAP);
    for (const [abbr, full] of Object.entries(ABBREVIATION_MAP)) {
        result = result.replace(new RegExp(`\\b${abbr}\\b`, 'gi'), full);}
    return result;
}

function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildRelaxedPattern(term: string): RegExp {
    const spaced = term
        .split(/\s+/)
        .map(escapeRegex)
        .join('[\\s,\\/\\-]*(or|and)?[\\s,\\/\\-]*');
    return new RegExp(spaced, 'i');
}

function findMatches(list: string[], text: string, allowAmbiguous: boolean): string[] {
    return list.filter(term => {
        const pattern = buildRelaxedPattern(term);
        const matched = pattern.test(text);
        const negated = isNegated(text, term);
        const ambiguous = isAmbiguousContext(text, term);
        return (
            matched &&
            !negated &&
            (allowAmbiguous || !ambiguous));});
}

export function runExtraction(text: string, allowAmbiguous = false) {
    const cleanText = normalize(text);
    const nameMatch = cleanText.match(/Mr\.?\s([A-Z][a-z]+)\s([A-Z][a-z]+)/);
    const patient_name = nameMatch ? `${nameMatch[1]} ${nameMatch[2]}` : "Unknown";
    const age = extractAge(cleanText);
    const gender = extractGender(cleanText);
    const diagnoses = findMatches(DIAGNOSES_LIST, cleanText, allowAmbiguous);
    const medications = findMatches(MEDICATIONS_LIST, cleanText, allowAmbiguous);
    const procedures = findMatches(PROCEDURES_LIST, cleanText, allowAmbiguous);
    return {
        patient_name,
        age,
        gender,
        diagnoses,
        procedures,
        medications};
}




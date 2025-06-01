export const ABBREVIATION_MAP: Record<string, string> = {
    "MI": "myocardial infarction",
    "CP": "chest pain",
    "ASA": "aspirin",
    "PCI": "angioplasty",
    "dx": "diagnosed"
};

export const NAME_TYPO_MAP: Record<string, string> = {
    "Jhon": "John",
    "Smiht": "Smith",
    "Grag Narton": "Greg Norton",
    "Brain Hall": "Brian Hall",
    "Kavin Blake": "Kevin Blake",
    "Marck Devis": "Mark Davis",
    "Alen Bruks": "Alan Brooks"
};

export const BODY_TYPO_MAP: Record<string, string> = {
    "ches": "chest",
    "chset": "chest",
    "nekc": "neck",
    "shulder": "shoulder",
    "wirst": "wrist"
};

export const MEDICATION_TYPO_MAP: Record<string, string> = {
    "asprin": "aspirin"
};

export const MEDICATIONS_LIST = [
    "aspirin"
];

export const PROCEDURE_TYPO_MAP: Record<string, string> = {
    "angiloplasty": "angioplasty",
    "angiolplasty": "angioplasty",
    "angilplasty": "angioplasty"
};

export const PROCEDURES_LIST = [
    "angioplasty"
];

export const DIAGNOSIS_TYPO_MAP: Record<string, string> = {
    "mycordial infraction": "myocardial infarction",
    "mycordial infractoin": "myocardial infarction"
};

export const DIAGNOSES_LIST = [
    "myocardial infarction",
    "chest pain",
    "hypertension"
];

export const GENDER_KEYWORDS = [
    "male",
    "female",
    "m",
    "f"
];

export const GENDER_MAP: Record<string, string> = {
    "m": "male",
    "f": "female",
    "male": "male",
    "female": "female"
};

export const GENDER_TYPO_MAP: Record<string, string> = {
    "mael": "male",
    "femle": "female",
    "feemale": "female",
    "mal": "male",
    "femail": "female"
};

export const AGE_LIST = [
    "yo",
    "yr",
    "years old",
    "year old",
    "year-old",
    "-yer-old",
    "yer old",
    "yers old"
];

export const NEGATION_PATTERNS = [
    (term: string) => new RegExp(`without (any )?${term}`, "i"),
    (term: string) => new RegExp(`denies (any )?${term}`, "i"),
    (term: string) => new RegExp(`was not given ${term}`, "i"),
    (term: string) => new RegExp(`not given ${term}`, "i"),
    (term: string) => new RegExp(`did not receive ${term}`, "i"),
    (term: string) => new RegExp(`not prescribed ${term}`, "i"),
    (term: string) => new RegExp(`did not undergo ${term}`, "i"),
    (term: string) => new RegExp(`denied any complaints of ${term}`, "i"),
    (term: string) => new RegExp(`did not deny ${term}`, "i"),
    (term: string) => new RegExp(`ruled out ${term}`, "i"),
    (term: string) => new RegExp(`${term} was ruled out`, "i"),
    (term: string) => new RegExp(`${term}\\sruled out`, "i"),
    (term: string) => new RegExp(`no (signs of )?([a-z\\s,\\/\\-]*(or|and)?[a-z\\s,\\/\\-]*)+`, 'i')
];

export const AMBIGUOUS_PATTERNS = [
    (term: string) => new RegExp(`history of ${term}`),
    (term: string) => new RegExp(`possible ${term}`),
    (term: string) => new RegExp(`possibly ${term}`),
    (term: string) => new RegExp(`suspected ${term}`),
    (term: string) => new RegExp(`likely ${term}`),
    (term: string) => new RegExp(`may have ${term}`),
    (term: string) => new RegExp(`could be ${term}`)
];

export function extractAge(text: string): number {
    const pattern = new RegExp(`\\b(\\d{2,3})\\s?(-|–)?\\s?(${AGE_LIST.join("|")})\\b`, "i");
    const match = text.match(pattern);
    return match ? parseInt(match[1]) : -1;
}

export function extractGender(text: string): string {
    const pattern = new RegExp(`\\b(${GENDER_KEYWORDS.join("|")})\\b`, "i");
    const match = text.match(pattern);
    if (match) {
        const normalized = GENDER_MAP[match[1].toLowerCase()];
        if (normalized) return normalized;}
    return "unknown";
}
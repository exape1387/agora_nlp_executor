# Welcome to the Clinical NLP extraction project made as a test assessment for Axpo

Below in this file I will describe key project's features, how to use it and answer a bunch of questions from 
Assessment task.pdf


## Project's tree:

- /data. Folder, that contains files with input and output data validation objects.
- /src. Consist of data extractor, fuzzy initializer and normalization module.
- /tests. Includes spec files separated my common theme.
- .gitignore. Files and folders to avoid during committing.
- jest.config.js. Jest's settings configuration file.
- package.json. Dependencies, descriptions and execution file.
- README.md. You are here 👋🏻.
- tsconfig.json. Mid-level service, imports and modules managing.


## Features:

- Fuzzy matches clinical terms using flexible regexp.
- Detecting negated diagnoses, medications and procedures.
- Filters ambiguous contexts.
- Normalizing typos using Fuzzy threshold and abbreviations.


## Installation:

1. Make sure you made proper pull, clone or fork.
2. Run "npm install", make sure /node-modules and package-lock.json appeared.
3. Use "npm run test" to run all tests cases under provided path.


## Dive deep into actual functionality.

* test-cases.json
Represents an array of objects (read data pieces), which contains 
id, input, ambiguous, expected, -patient name, -age, -gender, -diagnoses, -procedures, -medication.
Make sure to follow design. Contains basic, typo, abbreviations, negated, ambiguous and other edge cases.
* extractor.ts
Consist of functions to proceed if isNegated(), isAmbiguousContext(), applyTypos(), normalize(),
escapeRegex(), buildRelaxPatterns(), findMatches() and runExtraction().
In a nutshell it's a helper, providing all interactions with data extraction according to all test designs.
* fuzzyUtils.ts 
Fuzzy helper to manage threshold and comparison functions for sub data.
* normalization.ts
Has lists of values for medications, genders, procedures, names, abbreviations, diagnosis, ages, negations etc
Includes typos and it's solution.
Also contains lists of regexps (patterns) for extracting info in edge cases.
According to all those sets, extracts age and gender.
* extractor.test.ts
Runs a test, which loops all objects from test-cases.json and validates input with expected outputs.



# Assignment Instructions answers and comments:

## Main part


### Overall Test Strategy

Verify extracted entities (name, age, gender, diagnoses, procedures, medications) match expected results using exact and fuzzy matching.
Ensure all relevant entities are detected in various input formats, including complex sentences.
Run tests on diverse datasets repeatedly to ensure consistent outputs; monitor false positives/negatives, especially around negation and ambiguity.
Maintain a regression suite that runs on every code change to catch any breaking changes early.
Consistently increase lists for all the fields, like medicines, procedures, names, typos etc.

### Test Case Design

Clear, unambiguous examples with straightforward mentions.
Inputs including common abbreviations and known typos corrected by maps (e.g., “MI” => “myocardial infarction”, “asprin” => “aspirin”).
Sentences explicitly negating terms (e.g., “not given aspirin”, “did not undergo angioplasty”).
Phrases with uncertainty like “possible hypertension”, “history of chest pain”.
Multiple sentences, punctuation boundaries, and incomplete data fields.
Inputs with different capitalization, spacing, and punctuation.
Slight variations and partial matches to validate fuzzy logic thresholds.

### Automation Plan

Run extraction on curated test cases (including edge cases).
Integrate tests in CI/CD pipelines (GitHub Actions, Jenkins etc.) for continuous validation.
In this project I use TypeScript + Jest + Fuzzy, as it provides fast, high-level executions with assertions and validations.
Also, Python and JavaScript can be used easily for those purposes.
Usually, working with text, requires a library which can match expectations through threshold. The best option for this is Fuzzy, it has a lot
of settings and arguments, to validate input with expected object with optional differences.

### Manual Testing

Exploratory testing with real-world clinical notes to find unhandled edge cases.
Validate ambiguous or complex sentences where NLP heuristics might fail.
Usability and interpretability of extracted data (to ensure output matches clinical expectations).

### Scalability & Maintenance

Modularize extraction and normalization logic so new entity types or vocabularies can be added with minimal impact.
Maintain separate typo/abbreviation maps and entity lists in dedicated files or databases.
Write reusable test case templates that can be easily extended with new scenarios.
Use data-driven testing with JSON test case files for easy updates.
Keep comprehensive documentation of rules, maps, and test coverage.
Implement semantic versioning and changelogs to track changes in extraction logic.
Automate test runs on PRs and merges.
Monitor production feedback (if available) to update tests and maps accordingly.
Always update normalization lists.


## Additional Part

### Prioritization Under Constraints

Focus on critical user journeys and high-impact features first. For clinical NLP, 
this means prioritizing extraction accuracy for key patient data (diagnoses, medications, procedures), 
since these directly impact downstream decisions.

Target high-risk areas with frequent changes or known complexity. 
For example, negation and ambiguity detection patterns which are tricky and often a source of errors.

Leverage existing automated tests to cover regression and core functionality. 

Manual testing should focus on edge cases, integration, and usability.

Use data-driven prioritization: analyze real clinical note samples to find the most common patterns and terms to test against.

Keep feedback loops tight: get early input from clinical SMEs or product owners to align testing scope with business priorities.

### Minimum Viable Product (MVP) Testing Plan for First Release

Automated tests for core extraction functions (diagnoses, medications, procedures, age, gender).

Validation of negation and ambiguity detection on representative clinical sentences.

Basic integration tests on normalized text input => structured output.

Smoke tests on full pipelines to ensure no crashes and stable responses.

A small set of manual exploratory tests on clinical edge cases to identify glaring gaps.

Documentation of known limitations and assumptions to manage expectations.

### Long-Term QA Roadmap

#### Month 1 - 2

Expand automated test coverage to include more clinical terms, edge cases, and false positive/negative scenarios.
Introduce fuzzier matching and typo handling improvements with new data insights.
Integrate continuous integration (CI) pipelines with automated test runs on every commit.
Establish baseline performance and accuracy metrics.

#### Month 3 - 4

Collaborate with clinical domain experts to validate output quality and update patterns accordingly.
Build monitoring tools for production data to detect degradation or anomalies in extraction accuracy.
Add support for multi-language inputs or more complex negation structures if relevant.
Improve error reporting and logging to speed up debugging and issue resolution.

#### Month 5+

Integrate with downstream clinical workflows or analytics platforms, adding E2E testing.
Consider moving from regex/fuzzy matching to hybrid ML/NLP models for better scalability.
Develop user-facing QA dashboards or reports for continuous quality visibility.
Plan for regular retraining/updating cycles as clinical terminology evolves.
Project infrastructure to keep the service on external machine.





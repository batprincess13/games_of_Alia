# Games of Alia

Games of Alia is a GitHub-hosted collection of purpose-built learning games. GitHub `main` is the source of truth.

Live site: `https://batprincess13.github.io/games_of_Alia/`

## Site structure

- `/` — Games of Alia homepage and game library.
- `/builder-quest/` — Builder Quest, the first live game.
- `home.css` — Games of Alia homepage styling.
- `style.css`, `config.js`, `questions.js`, `app.js` — current Builder Quest implementation used by the Builder Quest route.
- `BUILDER_QUEST_GOVERNING_SPEC.md` — controlling Builder Quest learning/game specification.

## Games of Alia positioning

The umbrella brand is not tied to one subject, one grade, or Builder Quest. It is a growing collection of games designed to turn school skills into challenges, decisions, real problem-solving, and meaningful play.

Current brand line: `Play with purpose.`

Homepage principles:

- It should feel like a real game destination first, not an LMS or worksheet portal.
- Builder Quest is clearly presented as the first game, not the whole platform.
- Future games remain uncommitted until approved; use Coming Soon cards rather than inventing product names.
- Individual games can have their own visual identities while remaining part of Games of Alia.

## Builder Quest

Before changing Builder Quest:

1. Read `BUILDER_QUEST_GOVERNING_SPEC.md` in full.
2. Inspect the current code before editing.
3. Preserve the carpentry/business game concept.
4. Treat curriculum, competency progression, adaptive mastery, and gameplay as one system.
5. Validate changes before claiming they work or are complete.

Academic hierarchy:

`DepEd curriculum → competency → learning progression → adaptive mastery → game scenario`

Learning progression:

`Introduce → teach/model → guided practice → fade support → independent application → transfer → mastery → retention`

Core business loop:

`Customer call → diagnose → determine materials → calculate quantity → check inventory → buy supplies → choose service/labor fee → quote → perform work → collect payment → calculate profit → grow business`

Current live curriculum is Grade 3 Mathematics. The game is intended to expand to additional grade levels later without turning higher levels into simple number scaling. Progress remains local to the device/browser; no cloud account or centralized learner database is required.

## Current Builder Quest implementation

- 36 Grade 3 mathematics competency clusters.
- Diagnostic-only Toolbox onboarding that does not certify mastery.
- Evidence-weighted mastery requiring at least 85% plus component coverage, independent/no-hint performance, applied/transfer evidence, and recent performance.
- Teaching, guided practice, scaffold fading, reteaching, independent application, transfer, and retention phases.
- Weak-component targeting and recent-question avoidance.
- Generator coverage validation requiring at least 200 distinct encounter keys per competency and generator coverage for every listed component.
- Full contract flow through inventory, purchasing, labor/service fee choice, quote, work completion, payment, profit, and portfolio.
- Realistic fixed-peso labor/service fee choices by business tier, with material costs separate.
- Local profiles, parent password controls, curriculum map, portfolio, approved consequence confirmation, and approved 100% reward confirmation.

## Validation

GitHub Actions runs on every push to `main` and on pull requests. It checks:

- JavaScript syntax.
- Builder Quest learning-engine and generator coverage.
- At least 200 distinct generated encounter keys per competency.
- Games of Alia homepage presence and link to Builder Quest.
- Builder Quest DOM contract and script order at `/builder-quest/`.
- Governing files remain present.

Automated checks do not replace real browser or child playtesting. Do not claim browser/usability validation unless it has actually been performed.

## Acceptance authority

For Builder Quest learning/game behavior, `BUILDER_QUEST_GOVERNING_SPEC.md` controls. If code and the governing spec disagree, fix the code. For the overall site, preserve Games of Alia as the umbrella game library and keep each game independently accessible from the homepage.

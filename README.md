# Builder Quest

Builder Quest is a GitHub-hosted Grade 3 carpentry/building business game for Alia. GitHub `main` is the source of truth.

## Read before changing the game

1. Read `BUILDER_QUEST_GOVERNING_SPEC.md` in full.
2. Inspect the current repository code before editing.
3. Preserve the carpentry/business game concept.
4. Treat curriculum, competency progression, adaptive mastery, and gameplay as one system.
5. Validate changes before claiming they work or are complete.

## Governing hierarchy

`DepEd curriculum → competency → learning progression → adaptive mastery → game scenario`

Normal learning progression:

`Introduce → teach/model → guided practice → fade support → independent application → transfer → mastery → retention`

Mastery requires at least 85% plus defensible independent evidence across the competency's components, varied forms/contexts, application/transfer, consistency, recency, and retention. No fixed question count establishes mastery. Toolbox is diagnostic/onboarding only and cannot certify mastery.

## Core game loop

`Customer call → diagnose → determine materials → calculate quantity → check inventory → buy supplies → choose service/labor fee → quote → perform work → collect payment → calculate profit → grow business`

Business path:

`Toolbox → House Calls → Room Contractor → House Contractor → Building Contractor`

## Non-negotiables

- One new curriculum competency is normally the learning focus at a time.
- Previously mastered competencies spiral into later jobs.
- Every competency must support at least 200 materially distinct encounters, not cosmetic number swaps.
- Question generation must resist memorization and recent repetition.
- Jobs must require meaningful carpentry/business decisions rather than worksheets with carpentry nouns.
- Philippine service/labor fees must be realistic and separate from materials.
- Do not require percentage markup calculations outside Grade 3 scope.
- Completed contracts build the portfolio. Never display an unearned mastery badge.
- Preserve local browser/device profiles and parent controls.
- Approved consequences: household chore, one song number, dance, read a book. Display `SHOW MOMMY FOR CONFIRMATION`.
- Approved 100% reward categories: school-day screen time (30 minutes), cash, food. Cash/food amounts must not be hardcoded without approval.
- Clearing browser data can erase local progress and the UI must warn about this.

## Current architecture

The live page uses one maintained implementation:

`index.html → style.css + config.js → questions.js → app.js`

There is no duplicate embedded game engine in `index.html`.

## Current implementation state

The current build includes:

- 36 Grade 3 mathematics competency clusters, including area, composite figures, perimeter, time/duration/elapsed time, number and operations, data/probability, multiplication, division, fractions, translation, and symmetry.
- Diagnostic-only Toolbox onboarding that does not certify mastery.
- Evidence-weighted mastery requiring at least 85% plus component coverage, independent/no-hint performance, applied/transfer evidence, and recent performance.
- Teaching, guided practice, scaffold fading, reteaching, independent application, transfer, and retention phases.
- Weak-component targeting and recent-question avoidance.
- Generator coverage validation requiring at least 200 distinct encounter keys per competency and generator coverage for every listed component.
- Full contract flow from curriculum work through inventory check, purchasing, labor/service fee decision, customer quote, work completion, payment, profit, and portfolio recording.
- Realistic fixed-peso labor/service fee choices by business tier, with material costs kept separate.
- Local profiles, parent password controls, curriculum map, portfolio, approved consequence confirmation, and approved 100% reward confirmation.
- Automated GitHub validation for JavaScript syntax, generator coverage, page load/DOM contract, script architecture, and governing files.

## Validation

GitHub Actions runs on every push to `main` and on pull requests. It checks:

- JavaScript syntax for the game and test files.
- Every listed competency/component has a working question generator.
- At least 200 distinct encounter keys can be generated per competency.
- The page contains the required DOM controls and the game scripts load in the correct order.
- The repository uses the split architecture rather than a duplicate embedded engine.
- `README.md` and `BUILDER_QUEST_GOVERNING_SPEC.md` remain present.

These automated checks are not a substitute for manual child/browser playtesting. Do not claim browser or usability validation unless it was actually performed.

## Acceptance authority

`BUILDER_QUEST_GOVERNING_SPEC.md` controls detailed learning/game requirements. If code and the governing spec disagree, fix the code. Do not silently narrow the project to one defect or one feature. Work against the complete governing scope.

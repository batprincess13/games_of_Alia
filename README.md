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

## Current implementation state

The repository is mid-rebuild. Recent work introduced component-aware curriculum sequencing, anti-repeat question generation, diagnostic-only Toolbox behavior, realistic service fees, and portfolio records. These changes are not sufficient to declare the game complete.

Known work still required includes full codebase consolidation/validation, complete current MATATAG Grade 3 curriculum audit, richer question-family coverage for every competency, truly adaptive scaffold fading and retention, meaningful multi-step business job flow, portfolio/parent/reward UI validation, and end-to-end testing.

`index.html` currently contains legacy embedded CSS/JavaScript while separate `style.css`, `config.js`, `questions.js`, and `app.js` also exist. Consolidate this safely without dropping parent controls, portfolio, curriculum modal, reward/consequence gates, or profile controls.

## Acceptance authority

`BUILDER_QUEST_GOVERNING_SPEC.md` controls detailed learning/game requirements. If code and the governing spec disagree, fix the code. Do not silently narrow the project to one defect or one feature. Work against the complete governing scope.

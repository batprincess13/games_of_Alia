# Builder Quest — Governing Learning & Game Specification

## Purpose
This file is the controlling reference for Builder Quest. Future changes should be checked against it before modifying curriculum sequencing, question generation, mastery, progression, or gameplay. The Builder Quest concept remains intact unless Jenny explicitly approves a redesign.

## 1. Core Game Concept — Preserve
Builder Quest is a carpentry/building business learning game designed to grow with the learner across multiple school levels. Grade 3 is the first implemented curriculum, not the permanent ceiling of the game.

The learner grows a building business by completing increasingly complex work. The mathematical and technical demands of those jobs must mature with the learner's selected school level.

Business progression:
Toolbox → House Calls → Room Contractor → House Contractor → Building Contractor

Core job loop:
Get a customer call → diagnose the job → determine materials → calculate quantity → check inventory → buy supplies → decide service/labor fee → quote customer → perform work → collect payment → calculate profit → upgrade the business → accept harder jobs.

The visible experience should feel like running and growing a carpentry/building business, not completing a digital worksheet.

Preserve customer calls/contracts, carpentry/building jobs, measurements/materials, inventory/purchasing, realistic Philippine service/labor fees, quoting/payment/profit, business upgrades, completed-project portfolio, approved rewards/consequences, and approved local browser/device profiles and parent controls.

Academic-engine corrections must not be used as a reason to redesign or simplify the Builder Quest concept.

## 2. Multi-Level Curriculum Architecture
Builder Quest must support curriculum packs by school level rather than one universal question bank with larger numbers.

The governing hierarchy is:
CURRICULUM VERSION → SCHOOL LEVEL → SUBJECT/TRACK → COMPETENCY → LEARNING PROGRESSION → ADAPTIVE MASTERY → GAME SCENARIO

Each curriculum pack must define its own:
- official source and curriculum version;
- grade/year level;
- subject or track;
- competency sequence;
- component skills and prerequisites;
- question/problem families;
- age-appropriate teaching/scaffolding;
- mastery evidence requirements;
- allowed mathematical tools and representations;
- business/building applications appropriate to that level.

Changing school level must not erase prior progress. Player profiles must keep progress separately by curriculum version and level.

The game must never simulate a higher level by merely increasing numbers or adding decorative complexity. The mathematical ideas, reasoning demands, representations, and applications must actually match the selected curriculum.

## 3. Official Curriculum Controls Content
For every supported level, use the current official DepEd curriculum that applies to that learner cohort. Do not assume that one curriculum framework applies unchanged to all grades.

Grade 3 currently uses the official MATATAG Mathematics curriculum already implemented in the game.

For Senior High School, curriculum selection must account for the current DepEd transition. The game must store curriculum version/cohort information so Grade 11 and Grade 12 content can follow the correct official curriculum rather than being forced into one inaccurate map.

Before any level is labeled supported, its curriculum map must be audited against the current official source. Every required competency used by the game must be represented accurately.

New competencies are introduced in an appropriate curriculum sequence. Previously mastered competencies may be naturally incorporated into later jobs.

## 4. Teaching Comes Before Mastery Assessment
A new topic must not be treated as something the learner is already expected to know.

Normal progression:
INTRODUCE → TEACH/MODEL → GUIDED PRACTICE → FADE SUPPORT → INDEPENDENT APPLICATION → TRANSFER → MASTERY → RETENTION

When a topic is new, the first relevant encounters normally provide information or instruction. Example: when introducing rectangle area, explain that area describes the flat surface covered and that rectangle area can be found by multiplying length × width.

The first two or three encounters may normally contain teaching/scaffolding, but this is not a rigid counter. If the learner understands quickly, support can begin fading. If the learner still needs help, teaching continues. If support is removed and the learner struggles, targeted instruction can return.

Guided or heavily hinted responses are learning evidence, not proof of independent mastery.

## 5. Mastery Is Adaptive, Not Question-Count Based
There is no fixed number of questions that equals mastery. Five correct answers do not automatically equal mastery. Ten correct answers in a row do not automatically equal mastery. A learner may need fewer or many more encounters depending on the quality of the evidence.

The default non-negotiable accuracy threshold is at least 85%, but 85% alone is not sufficient. Higher-level curriculum packs may require additional precision, reasoning, or transfer standards where appropriate.

Mastery must be supported by evidence of accuracy, independence, coverage of the actual curriculum competency/components, varied forms/contexts, application and transfer, consistency, sufficient recent performance, and retention through later spiral review.

The engine must not infer more than the evidence supports. When evidence is ambiguous, continue teaching/assessing rather than declaring mastery. The amount and type of practice must adapt to the learner's performance.

For older learners, especially Senior High and engineering-oriented pathways, mastery evidence should increasingly include multi-step reasoning, strategy selection, assumptions, precision, error detection, justification, and transfer to unfamiliar constraints.

## 6. Adapt Within the Current Competency
Adaptivity should primarily change HOW the learner learns the current competency, not cause the game to jump among unrelated new subjects.

If the learner struggles, identify the likely component weakness, provide targeted teaching/practice, vary the representation/context, and restore scaffolding when needed.

Example: if the learner can multiply 6 × 4 but does not recognize that a 6-by-4 tabletop requires an area calculation, the weakness is concept/application rather than necessarily multiplication. Practice should target the relevant weakness.

Only after the current competency has defensible mastery evidence should the next new curriculum competency become the learning focus.

## 7. Mastered Skills Carry Forward
Mastered mathematics does not disappear. When the next competency is introduced, previously mastered competencies should appear naturally inside later carpentry/business jobs. They become part of the learner's working mathematical toolkit.

This creates cumulative learning: master current competency → introduce next competency → continue applying prior competencies → periodically verify retention.

A later job can combine several mastered skills while introducing only one manageable new concept.

When the learner moves to a higher grade/year level, relevant mastered skills from earlier levels should remain available as prerequisite evidence and spiral review, without automatically certifying mastery of the new level's more advanced competencies.

## 8. Question Repository and Anti-Memorization Requirement
Every curriculum competency must support at least 200 materially distinct encounters.

This does not mean 200 cosmetic rewrites of the same arithmetic question. Build multiple validated question families capable of generating many mathematically distinct variations.

Variation can include mathematical structure, dimensions/numbers, required reasoning, representation, units, job type, materials, inventory, customer requirements, missing/extra information, constraints, direct versus applied versus transfer contexts, and open-ended decision quality where the level supports it.

The engine must track prior/recent encounters and avoid repeating exact questions or trivially recognizable variants. The purpose is to prevent a slower learner from memorizing a small looping question bank instead of understanding the principle.

Two hundred versions of the same `6 × 4` structure do not satisfy this requirement.

## 9. Toolbox / Diagnostic Entry
The Toolbox functions as onboarding/tutorial/diagnostic experience.

For younger levels it may contain approximately 10 short/basic questions. Older levels may use a more appropriate diagnostic length and structure, but diagnostics must remain separate from formal mastery evidence.

Diagnostic responses may help determine what teaching is needed, but they must NOT certify curriculum mastery and must NOT contaminate the independent mastery evidence used to advance through the curriculum.

## 10. Business Progression and Academic Progression
Business progression and academic progression correlate but are not identical. Harder/larger contracts unlock only when the mathematics required for those contracts has genuinely been mastered.

The learner should experience: “My building business is growing because I can handle harder work.” The learner should not experience: “I finished Chapter 6.”

The same business world must mature with the learner. Younger learners may handle simple measurements, quantities, money, perimeter, area, fractions, time, and basic data. Older learners may encounter algebra, ratios, scale, geometry, trigonometry, statistics, optimization, technical estimation, tolerances, constraints, project trade-offs, and other curriculum-appropriate applied mathematics.

## 11. Engineering-Oriented Advanced Path
At higher levels, Builder Quest may offer an optional engineering-oriented pathway. This is not a claim of professional engineering training and must not introduce unsafe real-world construction instructions.

Its purpose is to strengthen applied STEM thinking through curriculum-aligned simulations such as:
- selecting relevant information and measurements;
- comparing design alternatives;
- interpreting scale, geometry, graphs, and specifications;
- estimating material use and waste;
- evaluating cost and efficiency trade-offs;
- solving constrained multi-step problems;
- detecting unreasonable or inconsistent results;
- stating assumptions;
- checking precision and units;
- explaining why one solution is preferable to another.

Higher-level contracts should increasingly allow more than one defensible approach and should assess the reasoning behind the decision, not only the final numerical answer.

## 12. Questions Must Be Gameplay, Not Worksheets in Costume
Create building/carpentry situations in which the mathematics is genuinely necessary. Do not simply write ordinary math questions and replace generic nouns with boards, nails, or carpenter.

Jobs should create meaningful decisions such as what needs to be measured, what operation or model is appropriate, how much material is needed, whether inventory is sufficient, what must be purchased, how much the job costs, what service/labor fee to charge, what to quote, what constraints must be satisfied, what trade-offs exist, and what profit was earned.

A single job can contain multiple meaningful mathematical decisions, but only one not-yet-mastered curriculum competency should normally be the new instructional focus.

## 13. Service Fees and Business Math
Service/labor fees must be reasonably close to real Philippine market conditions. Materials and labor/service fees should remain distinguishable.

Do not impose a universal correct markup percentage at levels where percentage calculations are outside the curriculum. Use curriculum-appropriate business mathematics for the selected level.

As the learner advances, business math may become more sophisticated only when the selected curriculum supports it. The game should not teach a business convention as though it were a universally correct mathematical rule.

## 14. Portfolio
Completed contracts should build a portfolio of the learner's actual work. Portfolio records can include project/job name, business tier, completion date, school level, curriculum version, math skills demonstrated, materials cost, service/labor fee, customer quote, profit, reasoning/engineering badges where genuinely earned, and genuinely earned mastery badges.

Do not claim a competency is mastered in the portfolio unless the mastery engine has actually established mastery.

## 15. Player Level and Progression Controls
A player profile must support:
- current school level;
- curriculum version/cohort;
- progress stored separately by level;
- diagnostic history;
- mastered competencies and prerequisite evidence;
- parent-controlled level changes for younger learners;
- optional practice outside the current level without contaminating formal mastery.

Moving to another level must never silently overwrite or merge incompatible mastery evidence.

## 16. Implementation Guardrails
Before modifying the game:
1. Read this file.
2. Check the current official curriculum map for the selected level/cohort.
3. Preserve the Builder Quest concept.
4. Identify the current curriculum competency.
5. Ensure its teaching/scaffolding progression exists.
6. Ensure question families cover its component competencies.
7. Ensure mastery is based on adaptive independent evidence, not a fixed count.
8. Ensure previous skills spiral naturally after mastery.
9. Keep progress isolated by curriculum level/version.
10. Validate the code before claiming the implementation is complete.

Do not patch around a flawed mastery model. Correct the learning-engine architecture when necessary.

## 17. Known Defects That Must Not Return
- Toolbox answers counted toward mastery.
- A few correct responses could advance the learner too quickly.
- New topics could be selected too freely instead of following curriculum progression.
- Formula/instruction could appear only as a hint instead of being explicitly taught before assessment.
- Broad competency clusters could be marked mastered without adequate evidence for their component skills.
- Small/repetitive question pools could permit memorization.
- Unrealistically low service-fee choices were used.
- Grade difficulty simulated only by using larger numbers.
- Progress from one grade/version incorrectly certifying another grade/version.

## 18. Acceptance Test
Before considering a curriculum pack and learning engine correct, verify that:
1. The selected official curriculum/version is identified.
2. The concept is introduced through a Builder Quest job.
3. The game teaches/models what is needed.
4. The learner gets supported practice.
5. Support fades based on performance.
6. Independent questions no longer provide the method/formula.
7. The game varies reasoning and context.
8. Correct answers do not cause an arbitrary jump after a fixed count.
9. Weak performance produces targeted additional learning.
10. Mastery requires ≥85% plus sufficient independent, varied competency evidence.
11. The next curriculum competency is introduced only after mastery.
12. The mastered competency continues appearing naturally in subsequent jobs.
13. Repeated play does not quickly expose a small repeating question set.
14. Changing school level preserves but isolates prior progress.
15. Higher-level problems become cognitively more advanced, not merely numerically larger.
16. Engineering-oriented content assesses reasoning, constraints, precision, and transfer where appropriate.

If any of these fail, that curriculum pack or learning engine is not compliant with this specification.

# Builder Quest — Governing Learning & Game Specification

## Purpose
This file is the controlling reference for Builder Quest. Future changes should be checked against it before modifying curriculum sequencing, question generation, mastery, progression, or gameplay. The Builder Quest concept remains intact unless Jenny explicitly approves a redesign.

## 1. Core Game Concept — Preserve
Builder Quest is a Grade 3 carpentry/building business game. The child grows a building business by completing increasingly complex work.

Business progression:
Toolbox → House Calls → Room Contractor → House Contractor → Building Contractor

Core job loop:
Get a customer call → diagnose the job → determine materials → calculate quantity → check inventory → buy supplies → decide service/labor fee → quote customer → perform work → collect payment → calculate profit → upgrade the business → accept harder jobs.

The visible experience should feel like running and growing a carpentry/building business, not completing a digital worksheet.

Preserve customer calls/contracts, carpentry/building jobs, measurements/materials, inventory/purchasing, realistic Philippine service/labor fees, quoting/payment/profit, business upgrades, completed-project portfolio, approved rewards/consequences, and approved local browser/device profiles and parent controls.

Academic-engine corrections must not be used as a reason to redesign or simplify the Builder Quest concept.

## 2. Curriculum Is the Governing Academic Structure
Start with the current official DepEd Grade 3 MATATAG Mathematics curriculum.

The hierarchy is:
CURRICULUM → COMPETENCY → LEARNING PROGRESSION → ADAPTIVE MASTERY → GAME SCENARIO

The game must not choose unrelated new topics merely because they are technically available. New competencies are introduced in the appropriate curriculum sequence. One competency is the principal new learning focus at a time. Previously mastered competencies may be naturally incorporated into later jobs.

Before claiming full-year coverage, the curriculum map must be audited against the current official Grade 3 MATATAG curriculum. Every required competency and component skill must be represented.

## 3. Teaching Comes Before Mastery Assessment
A new topic must not be treated as something the child is already expected to know.

Normal progression:
INTRODUCE → TEACH/MODEL → GUIDED PRACTICE → FADE SUPPORT → INDEPENDENT APPLICATION → TRANSFER → MASTERY → RETENTION

When a topic is new, the first relevant encounters normally provide information or instruction. Example: when introducing rectangle area, explain that area describes the flat surface covered and that rectangle area can be found by multiplying length × width.

The first two or three encounters may normally contain teaching/scaffolding, but this is not a rigid counter. If the child understands quickly, support can begin fading. If the child still needs help, teaching continues. If support is removed and the child struggles, targeted instruction can return.

Guided or heavily hinted responses are learning evidence, not proof of independent mastery.

## 4. Mastery Is Adaptive, Not Question-Count Based
There is no fixed number of questions that equals mastery. Five correct answers do not automatically equal mastery. Ten correct answers in a row do not automatically equal mastery. A child may need fewer or many more encounters depending on the quality of the evidence.

The non-negotiable mastery threshold is 85%, but 85% alone is not sufficient.

Mastery must be supported by evidence of accuracy, independence, coverage of the actual curriculum competency/components, varied forms/contexts, application and transfer, consistency, sufficient recent performance, and retention through later spiral review.

The engine must not infer more than the evidence supports. When evidence is ambiguous, continue teaching/assessing rather than declaring mastery. The amount and type of practice must adapt to the child's performance.

## 5. Adapt Within the Current Competency
Adaptivity should primarily change HOW the child learns the current competency, not cause the game to jump among unrelated new subjects.

If the child struggles, identify the likely component weakness, provide targeted teaching/practice, vary the representation/context, and restore scaffolding when needed.

Example: if the child can multiply 6 × 4 but does not recognize that a 6-by-4 tabletop requires an area calculation, the weakness is concept/application rather than necessarily multiplication. Practice should target the relevant weakness.

Only after the current competency has defensible mastery evidence should the next new curriculum competency become the learning focus.

## 6. Mastered Skills Carry Forward
Mastered mathematics does not disappear. When the next competency is introduced, previously mastered competencies should appear naturally inside later carpentry/business jobs. They become part of the child's working mathematical toolkit.

This creates cumulative learning: master current competency → introduce next competency → continue applying prior competencies → periodically verify retention.

A later job can combine several mastered skills while introducing only one manageable new concept.

## 7. Question Repository and Anti-Memorization Requirement
Every curriculum competency must support at least 200 materially distinct encounters.

This does not mean 200 cosmetic rewrites of the same arithmetic question. Build multiple validated question families capable of generating many mathematically distinct variations.

Variation can include mathematical structure, dimensions/numbers, required reasoning, representation, units, job type, materials, inventory, customer requirements, missing/extra information, and direct versus applied versus transfer contexts.

The engine must track prior/recent encounters and avoid repeating exact questions or trivially recognizable variants. The purpose is to prevent a slower learner from memorizing a small looping question bank instead of understanding the principle.

Two hundred versions of the same `6 × 4` structure do not satisfy this requirement.

## 8. Toolbox Is Diagnostic/Onboarding, Not Mastery
The Toolbox contains approximately 10 short/basic questions and functions as onboarding/tutorial/diagnostic experience.

Toolbox responses may help determine what teaching is needed, but they must NOT certify curriculum mastery and must NOT contaminate the independent mastery evidence used to advance through the curriculum.

## 9. Business Progression and Academic Progression
Business progression and academic progression correlate but are not identical. Harder/larger contracts unlock only when the mathematics required for those contracts has genuinely been mastered.

The child should experience: “My carpentry business is growing because I can handle harder work.” The child should not experience: “I finished Chapter 6.”

## 10. Questions Must Be Gameplay, Not Worksheets in Costume
Create building/carpentry situations in which the mathematics is genuinely necessary. Do not simply write ordinary math questions and replace generic nouns with boards, nails, or carpenter.

Jobs should create meaningful decisions such as what needs to be measured, what operation is appropriate, how much material is needed, whether inventory is sufficient, what must be purchased, how much the job costs, what service/labor fee to charge, what to quote, and what profit was earned.

A single job can contain multiple meaningful mathematical decisions, but only one not-yet-mastered curriculum competency should normally be the new instructional focus.

## 11. Service Fees and Business Math
Service/labor fees must be reasonably close to real Philippine market conditions. Materials and labor/service fees should remain distinguishable.

Do not impose a universal correct markup percentage. Grade 3 business math should use curriculum-appropriate fixed peso amounts rather than requiring percentage calculations outside the Grade 3 scope. Keep required child calculations within appropriate Grade 3 number ranges even when larger real-world project values are used as context.

## 12. Portfolio
Completed contracts should build a portfolio of the child's actual work. Portfolio records can include project/job name, business tier, completion date, math skills demonstrated, materials cost, service/labor fee, customer quote, profit, and genuinely earned mastery badges.

Do not claim a competency is mastered in the portfolio unless the mastery engine has actually established mastery.

## 13. Implementation Guardrails
Before modifying the game:
1. Read this file.
2. Check the current official curriculum map.
3. Preserve the Builder Quest concept.
4. Identify the current curriculum competency.
5. Ensure its teaching/scaffolding progression exists.
6. Ensure question families cover its component competencies.
7. Ensure mastery is based on adaptive independent evidence, not a fixed count.
8. Ensure previous skills spiral naturally after mastery.
9. Validate the code before claiming the implementation is complete.

Do not patch around a flawed mastery model. Correct the learning-engine architecture when necessary.

## 14. Known Defects That Must Not Return
- Toolbox answers counted toward mastery.
- A few correct responses could advance the child too quickly.
- New topics could be selected too freely instead of following curriculum progression.
- Formula/instruction could appear only as a hint instead of being explicitly taught before assessment.
- Broad competency clusters could be marked mastered without adequate evidence for their component skills.
- Small/repetitive question pools could permit memorization.
- Unrealistically low service-fee choices were used.

## 15. Acceptance Test
Before considering the learning engine correct, verify that:
1. The concept is introduced through a Builder Quest job.
2. The game teaches/models what is needed.
3. The child gets supported practice.
4. Support fades based on performance.
5. Independent questions no longer provide the method/formula.
6. The game varies reasoning and context.
7. Correct answers do not cause an arbitrary jump after a fixed count.
8. Weak performance produces targeted additional learning.
9. Mastery requires ≥85% plus sufficient independent, varied competency evidence.
10. The next curriculum competency is introduced only after mastery.
11. The mastered competency continues appearing naturally in subsequent jobs.
12. Repeated play does not quickly expose a small repeating question set.

If any of these fail, the learning engine is not compliant with this specification.

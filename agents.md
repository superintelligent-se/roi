# AGENTS.md

## Purpose
This repository is maintained with Codex as an engineering collaborator.
The primary goals are:
- preserve functional correctness,
- improve maintainability,
- separate concerns cleanly,
- keep changes reviewable and reversible,
- prefer explicit reasoning over implicit large refactors.

## Operating model
Work in isolated git worktrees by default for any non-trivial task.
Treat each substantial task as its own branch/worktree unless explicitly told otherwise.

Typical task split:
1. analysis only,
2. design/reference analysis,
3. styling refactor,
4. logic refactor,
5. integration and QA.

Do not combine all of these into one large change unless explicitly requested.

## General engineering rules
- Preserve existing functionality unless a behavior change is explicitly requested.
- Prefer small, reviewable diffs over broad rewrites.
- Before major refactors, explain the proposed approach, file impact, and risks.
- Reuse the existing stack and architecture unless there is a strong reason not to.
- Do not introduce a new framework, build tool, or dependency unless explicitly approved.
- Match the current code style unless the task is specifically to standardize it.
- Prefer clarity, predictability, and maintainability over cleverness.

## Frontend architecture rules
- Separate structure, styling, and behavior cleanly.
- Prefer dedicated CSS files over inline styles where practical.
- Prefer semantic, stable, readable class names.
- Avoid mixing business logic with DOM manipulation.
- Keep rendering concerns separate from calculation/state logic.
- If JavaScript is extracted, organize it into focused modules or files that match the current project complexity.
- Do not over-engineer; choose the lightest solution consistent with the current stack.
- Color policy and palette scales live in `/DESIGN_TOKENS.md` and `/color-tokens.css`; update those first and keep CTA/link usage on the primary color and background usage on light secondary tones.

## URL policy
- Do not hardcode new URLs directly in HTML or JavaScript.
- Only use URLs defined in `/urls.js`.
- If a required URL is missing, add it to `/urls.js` first.
- Keep Swedish and English URL variants aligned.

## Localization policy
- Treat the Swedish version as the canonical source version for product, design, content, and logic.
- Any change to the Swedish experience must be reflected in the English experience in the same task by default.
- Do not treat Swedish/English parity as optional or as a follow-up unless the task explicitly says otherwise.
- Maintain `/` and `/en/` as mirrored variants of the same product, not two independently evolving implementations.

## Refactoring rules
When refactoring existing code:
- first identify all files that participate in the feature,
- describe current coupling between HTML, CSS, and JavaScript,
- preserve public behavior,
- preserve naming/API contracts unless renaming provides a clear benefit,
- avoid changing multiple concerns at once unless necessary.

For a calculator/spinner-style feature:
- isolate calculation logic,
- isolate DOM/query/selectors/event binding,
- isolate presentation styling,
- document assumptions about state flow and event lifecycle.

## Design reference usage
When given reference websites:
- extract principles, not copies,
- identify layout system, spacing rhythm, typography hierarchy, color hierarchy, component patterns, and interaction patterns,
- adapt the principles to this project’s context,
- do not clone brand-specific or copyrighted assets.

## Quality gates
Before concluding work:
- run available tests if the project has them,
- otherwise provide explicit manual verification steps,
- report what was verified and what remains unverified,
- summarize all changed files and why they changed,
- call out risks, tradeoffs, and follow-up opportunities.

## Git and worktree discipline
- Use a separate worktree for each substantial task.
- Keep branch names descriptive and scoped to the task.
- Do not assume another worktree has the same local environment prepared.
- If a worktree needs setup steps, use the project local environment instructions.
- Avoid mixing unrelated tasks in the same branch.

Suggested branch naming:
- analysis/<task>
- design/<task>
- refactor/css-<task>
- refactor/js-<task>
- qa/<task>

## Planning behavior
For tasks expected to take longer than a quick fix:
- produce a short implementation plan first,
- identify risks and unknowns,
- then execute in small steps.

For multi-hour or high-risk changes:
- create or update a planning document before implementation if requested.

## Output expectations
Each substantial response should include:
1. what was done,
2. which files changed,
3. why those files changed,
4. how it was verified,
5. what risks or next steps remain.

## Things to avoid
- large speculative rewrites,
- mixing style refactor and logic refactor without a reason,
- introducing abstractions before proving need,
- changing behavior silently,
- hiding uncertainty.

## Default mindset
Act like a senior engineer doing careful, production-conscious refactoring in an existing codebase with long-term maintainability as a first-class concern.

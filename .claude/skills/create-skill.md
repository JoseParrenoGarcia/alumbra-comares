---
name: create-skill
description: >
  Guides correct creation of a Claude Code skill (SKILL.md) for the Agentic-AutoML
  project. Use when: creating a new skill, adding a SKILL.md to .claude/skills/,
  writing skill workflow instructions, packaging a reusable process as a skill,
  designing a skill description for auto-selection. Covers: description design for
  selection (~800 chars, trigger keywords, edge cases, exclusions), SKILL.md body
  structure (under 500 lines), when to use references/ vs. body, anti-patterns
  (bloated description, invisible edge cases, no testing), skill vs. subagent
  distinction, optional directories (scripts/, references/, assets/), frontmatter
  parameters (allowed-tools, model, effort, context, argument-hint, paths,
  disable-model-invocation, user-invocable, hooks, shell), and runtime argument
  variables ($ARGUMENTS, $ARGUMENTS[N], $0/$1, $CLAUDE_SESSION_ID, $CLAUDE_SKILL_DIR).
  NOT for: creating agents, hooks, rules, or memory files — those have dedicated
  authoring skills.
---

# Create Skill

When asked to create a skill for this project, apply the following design rules consistently.

## Skill Anatomy

```markdown
---
name: skill-name              # must exactly match the parent directory name
description: [~800 chars]     # what it does + when to use + keywords + NOT for
license: MIT                  # optional
compatibility: Requires Python 3.11+ and uv   # optional — env requirements only
metadata:                     # optional
  author: your-name
  version: "1.0"

# Execution control (all optional)
argument-hint: "[milestone-id]"     # hint shown in autocomplete
disable-model-invocation: false     # true = manual /name trigger only
user-invocable: true                # false = hidden from / menu
allowed-tools: Bash Read Write Edit # tools auto-approved when skill is active
model: claude-haiku-4-5-20251001    # override session model for this skill
effort: high                        # low | medium | high | max (Opus 4.6+ only)
context: fork                       # fork = run in isolated subagent context
agent: Explore                      # subagent type when context: fork is set
paths: "content/**,index.html"      # glob: only activate when these files are open
shell: bash                         # bash (default) or powershell
hooks:                              # lifecycle hooks scoped to this skill
  post-tool-use:
    - command: echo "done"
---

# Skill Title

[Concise workflow instructions]

## Examples
[1-2 typical use cases]

## References
See references/ for detailed specs and examples.
```

**Directories:**
- `references/` — loaded on-demand, not at activation
- `scripts/` — executable code (shell, Python, etc.)
- `assets/` — templates, schemas

**Keep SKILL.md under 500 lines total.**

## Frontmatter Parameters

Only add parameters that change the skill's behaviour — don't copy the full list as boilerplate.

| Parameter | When to use |
|-----------|-------------|
| `argument-hint` | Skill accepts a user-supplied argument (e.g. milestone ID, filename). Shown in autocomplete as `[label]`. |
| `disable-model-invocation: true` | Skill should only run when explicitly invoked with `/name`, never auto-triggered by the model. |
| `user-invocable: false` | Internal/background skill. Hide from the `/` menu. |
| `allowed-tools` | Pre-approve specific tools so the skill runs without per-call permission prompts. List only what the skill actually needs. |
| `model` | Skill needs a specific model tier — e.g. `claude-haiku-4-5-20251001` for fast cheap tasks, Opus for deep reasoning. Also pin when the skill produces output that will be **compared across runs** (audits, scorecards, reports) — model drift between runs produces score noise that looks like site changes. Omit to inherit the session model. |
| `effort` | Skill needs more or less compute than the session default. Options: `low`, `medium`, `high`, `max` (Opus 4.6+ only). Pin alongside `model` for audit/scoring skills to keep qualitative judgements stable. |
| `context: fork` | Skill should run in an isolated subagent so it does not pollute the main context window. Combine with `agent:` to pick the subagent type. |
| `paths` | Skill is only relevant when certain files are open (e.g. `content/**` for a content-audit skill). Avoids spurious auto-activation. |
| `hooks` | Skill needs lifecycle side-effects (e.g. run a validator after every tool use). Keep hooks minimal. |

## Runtime Arguments

When a skill accepts user input via `/skill-name arg`, use these variables in the skill body:

| Variable | Value |
|----------|-------|
| `$ARGUMENTS` | Full argument string as typed |
| `$ARGUMENTS[0]`, `$0` | First argument |
| `$ARGUMENTS[1]`, `$1` | Second argument |
| `${CLAUDE_SESSION_ID}` | Current session ID — useful for scoping output files |
| `${CLAUDE_SKILL_DIR}` | Directory containing this SKILL.md — use to reference bundled scripts or assets regardless of working directory |

Example — skill that accepts a milestone ID:

```markdown
---
name: spawn-milestone
argument-hint: "[milestone-id]"
---
Read the milestone file at docs/milestones/$0.md and execute it.
```

## DOs

- **Write descriptions for selection, not documentation.** The description is the *only* part Claude reads before deciding whether to activate. Include: what it does, when to use it, specific trigger keywords, and what should NOT trigger it. Use ~800 of the 1,024 character limit.
- **Keep SKILL.md under 500 lines.** When the body exceeds it, move heavy content to `references/` for on-demand loading.
- **Separate instructions from heavy context.** SKILL.md = workflow logic. `references/` = style guides, lookup tables, large examples.
- **Narrow and discoverable scope.** One thing done reliably beats many things done inconsistently.
- **Use imperative phrasing in descriptions.** Frame as an instruction to the agent: "Use this skill when converting markdown to HTML" or "Use when the user needs..." rather than third-person declarations. Focus on user intent, not implementation mechanics.
- **Encode failure modes at selection.** If a skill should NOT run in certain conditions, state that in the description — not just in the body.
- **Test skills like code.** Write test cases (prompt + expected output), run with-skill vs. without-skill comparisons.

## DON'Ts

- **Don't put reference material in SKILL.md.** Style guides, spec docs, large examples belong in `references/`. Every byte there wastes tokens at activation.
- **Don't write vague descriptions.** "Helps with writing" is useless. "Converts markdown blog posts to Twitter threads, preserving key claims and tone" is specific.
- **Don't confuse skills with subagents.** Skills define *what to do and in what sequence*. Subagents provide *execution capacity and domain focus*. They compose naturally but solve different problems.
- **Don't over-design for hypothetical scenarios.** Build for the use case you have. If a skill breaks, extend it — don't pre-build flexibility.
- **Don't mix concerns.** A skill that both formats code and runs tests is doing two things. Split it.

## Anti-Patterns

| Problem | What It Looks Like | Fix |
|---------|------------------|-----|
| **Bloated descriptions** | 150 chars, vague ("Writes code nicely") | Expand to ~800 chars. Keywords + trigger conditions + what NOT to trigger. |
| **Invisible edge cases** | "Fix database issues" in description, but body says "only works with PostgreSQL" | Move PostgreSQL limitation to description |
| **References bloat** | 40 reference files, most loaded on every activation | Audit what's actually used. Load heavy docs only when explicitly imported. |
| **Undiscoverable skills** | Skill exists but Claude rarely picks it | Review keywords. Do they match how users naturally describe the task? |
| **No testing** | Skill works today, breaks silently in a pipeline tomorrow | Add at least 3 test cases. Run before/after comparisons. |
| **Skill + subagent confusion** | Trying to encode all logic in a skill | Ask: does this need specialized execution capacity? If yes, delegate to subagent. |

## When to Create a Skill vs. When Not To

| Scenario | Decision | Rationale |
|----------|----------|-----------|
| "I repeat this workflow 5+ times a week" | ✅ Create a skill | Codifies repeated work, saves time |
| "This requires specific domain knowledge" | ✅ Create a skill | Skill acts as guardrails and memory |
| "I do this once and never again" | ❌ Don't create a skill | Not worth the overhead |
| "This is a one-liner or 3-step fix" | ❌ Don't create a skill | Overhead exceeds benefit |
| "I need to coordinate multiple agents" | ⚠️ Skill orchestrates, agents execute | Use skill + subagents, not skill alone |

## Key Patterns

**Gotchas sections** — the highest-value content in many skills. List environment-specific facts that defy reasonable assumptions. Keep in the SKILL.md body (not `references/`) so the agent reads them before encountering the situation:

```markdown
## Gotchas
- The `users` table uses soft deletes. Always add `WHERE deleted_at IS NULL`.
- The user ID is `user_id` in the DB but `uid` in the auth service — same value, different key.
```

**Output format templates** — provide a concrete template for any output the agent must produce in a specific format. Agents pattern-match against structure more reliably than prose descriptions.

**Validation loops** — instruct the agent to validate its own work before proceeding. Pattern: do work → run `scripts/validate.py` → fix issues → repeat until passing.

**Defaults over menus** — when multiple tools could work, pick a default and briefly mention alternatives. Presenting equal options causes the agent to over-reason and under-act.

## Output

Place the skill at `.claude/skills/<skill-name>/SKILL.md`. Verify the description includes trigger keywords, exclusion phrases, and an output pointer. Confirm body is under 500 lines.

## Official References

- [Agent Skills specification](https://agentskills.io/specification) — SKILL.md format, frontmatter fields, directory structure
- [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices) — context efficiency, gotchas, templates, validation loops
- [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions) — imperative phrasing, triggering accuracy, eval methodology
- [Using scripts in skills](https://agentskills.io/skill-creation/using-scripts) — self-contained scripts, designing for agentic use
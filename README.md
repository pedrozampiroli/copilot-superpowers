# copilot-superpowers

A port of [obra/superpowers](https://github.com/obra/superpowers) for the [GitHub Copilot CLI](https://githubnext.com/projects/copilot-cli).

> **All credit goes to [Jesse Vincent (obra)](https://github.com/obra)** for the original Superpowers project, methodology, and skill content. This repository is a faithful port of that work, adapting it for the Copilot CLI plugin format with Brazilian Portuguese triggers.

---

## What is Superpowers?

Superpowers is a set of AI skills that enforce disciplined software engineering practices. Rather than letting an AI jump straight to writing code, Superpowers introduces structured gates:

1. **Brainstorm** — explore the problem, raise risks, compare approaches
2. **Write a Plan** — decompose the chosen approach into an actionable checklist
3. **Execute** — implement exactly what was planned

Additional skills cover code review, TDD, systematic debugging, parallel agent dispatch, branch finishing, and more.

See the original project for the full methodology: [github.com/obra/superpowers](https://github.com/obra/superpowers)

---

## Skills

This plugin ports all 14 skills from the upstream repository:

| Skill | Triggers (PT-BR) |
|-------|-----------------|
| **brainstorming** | brainstormar, pensar, arquitetar, nova feature... |
| **writing-plans** | planejar, criar plano, plano de implementação... |
| **executing-plans** | executar plano, implementar, codar, aprovado... |
| **requesting-code-review** | solicitar review, code review, revisar código... |
| **receiving-code-review** | receber review, feedback de code review... |
| **test-driven-development** | TDD, testes primeiro, escrever testes... |
| **systematic-debugging** | debugar, investigar bug, falha de teste... |
| **finishing-a-development-branch** | finalizar branch, pull request, PR... |
| **dispatching-parallel-agents** | agentes paralelos, paralelizar tarefas... |
| **subagent-driven-development** | desenvolvimento com subagentes, delegar... |
| **using-git-worktrees** | git worktree, workspace isolado, worktree... |
| **verification-before-completion** | verificar, confirmar funcionamento... |
| **writing-skills** | criar skill, escrever skill, nova skill... |
| **using-superpowers** | superpowers, iniciar, começar sessão... |

---

## Installation

Add the plugin to your Copilot CLI configuration:

```jsonc
// ~/.config/github-copilot/cli-plugins.json  (or your platform equivalent)
{
  "plugins": [
    "pedrozampiroli/copilot-superpowers"
  ]
}
```

---

## Structure

```
skills/
├── brainstorming/
│   ├── SKILL.md                        # Skill directive
│   ├── spec-document-reviewer-prompt.md
│   └── visual-companion.md
├── systematic-debugging/
│   ├── SKILL.md
│   ├── root-cause-tracing.md
│   ├── defense-in-depth.md
│   ├── condition-based-waiting.md
│   ├── condition-based-waiting-example.ts
│   └── find-polluter.sh
├── using-superpowers/
│   ├── SKILL.md
│   └── references/
│       ├── copilot-tools.md            # Copilot CLI tool mapping
│       ├── codex-tools.md              # Codex tool mapping
│       └── gemini-tools.md             # Gemini CLI tool mapping
└── ... (11 more skill directories)
```

Each `SKILL.md` contains upstream content from `obra/superpowers` with a `triggers` array added in Brazilian Portuguese (a Copilot CLI–specific addition).

---

## Differences from Upstream

| Aspect | obra/superpowers | This port |
|--------|-----------------|-----------|
| Platform | Claude Code | GitHub Copilot CLI |
| Triggers | None (no plugin system) | Brazilian Portuguese keywords |
| Subagent tool | `Task` | `task` (Copilot CLI) |
| Todo tracking | `TodoWrite` | `sql` (session SQLite) |
| Platform reference | — | `references/copilot-tools.md` |

---

## Credits

**Original project:** [obra/superpowers](https://github.com/obra/superpowers)  
**Original author:** [Jesse Vincent (obra)](https://github.com/obra)  
**License:** See [upstream repository](https://github.com/obra/superpowers) for license information.

This port was created to make the Superpowers methodology available to Copilot CLI users. No claim is made over the original skill content.

# Copilot CLI Tool Mapping

Skills use Claude Code tool names. When you encounter these in a skill, use your platform equivalent:

| Skill references | Copilot CLI equivalent |
|-----------------|------------------------|
| `Read` (file reading) | `view` tool |
| `Write` (file creation) | `create` tool |
| `Edit` (file editing) | `edit` tool |
| `Bash` (run commands) | `bash` tool |
| `Grep` (search file content) | `grep` tool |
| `Glob` (search files by name) | `glob` tool |
| `WebSearch` | `web_search` tool |
| `WebFetch` | `web_fetch` tool |
| `TodoWrite` (task tracking) | `sql` tool (session SQLite DB) |
| `Skill` tool (invoke a skill) | Skills load natively — just follow the instructions |
| `Task` tool (dispatch subagent) | `task` tool |
| Multiple `Task` calls (parallel) | Multiple `task` calls in the same response |

## Subagent support

Copilot CLI supports subagent dispatch via the `task` tool. Use it for skills like `dispatching-parallel-agents` and `subagent-driven-development`:

```
task(
  agent_type: "general-purpose",
  mode: "background",
  name: "my-agent",
  prompt: "..."
)
```

Available agent types: `explore`, `task`, `general-purpose`, `code-review`.

## Task tracking (`TodoWrite` → `sql`)

Copilot CLI has no native `TodoWrite`. Use the built-in `sql` tool with the session SQLite DB:

```sql
-- Create tasks
INSERT INTO todos (id, title, description) VALUES ('task-1', 'Title', 'Details...');

-- Mark in progress
UPDATE todos SET status = 'in_progress' WHERE id = 'task-1';

-- Mark done
UPDATE todos SET status = 'done' WHERE id = 'task-1';

-- Query pending
SELECT * FROM todos WHERE status = 'pending';
```

## Additional Copilot CLI tools

These tools are available in Copilot CLI but have no Claude Code equivalent:

| Tool | Purpose |
|------|---------|
| `ask_user` | Request structured input or choices from the user |
| `store_memory` | Persist facts about the codebase across sessions |
| `report_intent` | Update the displayed intent in the UI |
| `github-mcp-server-*` | GitHub API tools (issues, PRs, Actions, search, etc.) |

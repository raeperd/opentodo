# OpenTodo skills

Imported from [raeperd/pidex at e6c7a2466b28b8e38c45600f4810d3d6aeb58803](https://github.com/raeperd/pidex/tree/e6c7a2466b28b8e38c45600f4810d3d6aeb58803/.agents/skills). Commit `3175e5f` preserves all 67 source files unchanged. Subsequent commits adapt names, research scope, and repository assumptions for OpenTodo. The import uses this commit because the requested `v0.0.0` tag was unavailable.

All 15 skills are retained under `opentodo-*`, including their references and agent metadata. The six earlier unprefixed skills are replaced by their imported equivalents. Upstream license texts remain in [LICENSES](LICENSES).

Plan releases with [opentodo-create-milestone](opentodo-create-milestone/SKILL.md), invoked as `$opentodo-create-milestone`. GitHub milestone descriptions are the canonical implementation plans. Requested creation and updates use `gh api`; discussion-only drafts remain temporary under `.scratch/`. Publish issues separately through [opentodo-create-issues](opentodo-create-issues/SKILL.md).

This planning policy follows [Pidex PR #197](https://github.com/raeperd/pidex/pull/197) at `60d06e739a979748c3981cf4fb7f5dec9ca72539`, with OpenTodo skill names and existing local adaptations preserved. Repository plan files retain only links to migrated milestones. Keep the root README focused on the application and its commands, without issue or milestone references.

Technology guides apply to dependencies used or explicitly considered by the accepted work. Retaining the Pi SDK, oRPC, Drizzle, and Playwright guides does not add those dependencies or settle the OpenTodo architecture. Reference research uses Pidex for the shared stack and selects other sources according to the task.

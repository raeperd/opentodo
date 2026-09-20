---
name: opentodo-pi-sdk
description: Use when explicitly evaluating, adding, or changing a Pi coding agent SDK integration, including its sessions, models, events, resources, and tests.
---

Use the documentation shipped with the installed Pi package as the API authority.

This imported skill does not select Pi as an OpenTodo dependency. Apply it only to Pi work in the accepted scope. If the package is absent, report that and use version-pinned official documentation for evaluation; add it only when implementation calls for it.

## Process

1. Locate the installed package.
   - Resolve the workspace dependency for `@earendil-works/pi-coding-agent`.
   - Read its `README.md` and `docs/sdk.md` completely.
   - Read linked docs for sessions, settings, RPC, security, or extensions as needed.
   - Confirm the package version before relying on examples from another installation.
   - Completion: guidance and types come from the exact installed SDK version.

2. Choose the integration layer.
   - Use `createAgentSession` when one session owns the whole lifecycle.
   - Use `createAgentSessionRuntime` when new, resume, fork, or import replaces sessions.
   - Use RPC mode for process isolation or a non-Node client.
   - Keep the selected runtime layer in one clear composition root.
   - Completion: session ownership and replacement behavior are explicit.

3. Construct dependencies.
   - Create and share one `ModelRuntime` for model and credential resolution.
   - Choose persistent or in-memory `SessionManager` and `SettingsManager` deliberately.
   - Configure `DefaultResourceLoader` with the effective `cwd` and agent directory.
   - Call `reload` before consuming extensions, skills, prompts, or context files.
   - Inject custom tools and services at their documented boundaries.
   - Completion: model, settings, resources, tools, and persistence have clear owners.

4. Manage session events and prompts.
   - Subscribe before prompting when consumers need the complete event stream.
   - Treat event subscriptions as bound to one `AgentSession` instance.
   - Re-subscribe and rebind extensions after runtime session replacement.
   - Use `steer` or `followUp` explicitly while a session is streaming.
   - Treat `preflightResult` as acceptance feedback, not completion feedback.
   - Completion: event delivery and queued prompts remain correct across replacements.

5. Close the lifecycle safely.
   - Abort active work before teardown when the caller owns cancellation.
   - Unsubscribe listeners and dispose sessions when their owner shuts down.
   - Flush settings before a durability boundary and drain persistence errors.
   - Keep credentials in `ModelRuntime` stores or environment resolution paths.
   - Completion: shutdown leaves no active session, listener, or pending settings write.

6. Verify the integration.
   - Use in-memory session and settings managers for deterministic lifecycle tests.
   - Exercise real runtime replacement when code supports new, resume, fork, or import.
   - Test event ordering, prompt queueing, cancellation, and cleanup.
   - Keep provider-network tests separate and conditional on explicit credentials.
   - Completion: tests cover the lifecycle without depending on personal agent state.

## Official references

- [Pi repository](https://github.com/earendil-works/pi)
- [SDK documentation](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sdk.md)
- [Session documentation](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/sessions.md)
- [Security documentation](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md)

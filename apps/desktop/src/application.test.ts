import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import { applicationName } from "./application.js";

describe("desktop application", () => {
  it("provides its name through the application effect", () => {
    expect(Effect.runSync(applicationName)).toBe("OpenTodo");
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { queueGoogleTagCommand } from "@/lib/google-tag-queue";

afterEach(() => vi.unstubAllGlobals());

describe("Google tag command protocol", () => {
  it("queues consent, config and event commands as Arguments in order", () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal("window", { dataLayer });
    const consent = { analytics_storage: "denied" };
    const event = { send_to: "G-TEST123456" };
    queueGoogleTagCommand("consent", "default", consent);
    queueGoogleTagCommand("config", "G-TEST123456", { send_page_view: false });
    queueGoogleTagCommand("event", "phone_click", event);
    expect(dataLayer).toHaveLength(3);
    for (const entry of dataLayer) {
      expect(Object.prototype.toString.call(entry)).toBe("[object Arguments]");
      expect(Array.isArray(entry)).toBe(false);
    }
    expect(dataLayer.map(entry => Array.from(entry as IArguments))).toEqual([
      ["consent", "default", consent],
      ["config", "G-TEST123456", { send_page_view: false }],
      ["event", "phone_click", event],
    ]);
  });
});

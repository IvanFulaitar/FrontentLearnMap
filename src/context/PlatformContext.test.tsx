import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { PlatformProvider, usePlatform } from "./PlatformContext";

const STORAGE_KEY = "frontend-academy:platform-state";

/**
 * Regression coverage for the "Робоче середовище" (VS Code setup) course's
 * OS choice: it must be global (shared across every lesson in the course,
 * not reset per lesson) and must survive a reload, since the course's whole
 * premise is "pick your OS once, see the right instructions everywhere."
 */
describe("PlatformContext OS choice", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to windows when nothing is persisted yet", () => {
    const { result } = renderHook(() => usePlatform(), { wrapper: PlatformProvider });
    expect(result.current.os).toBe("windows");
  });

  it("updates in memory when setOs is called", () => {
    const { result } = renderHook(() => usePlatform(), { wrapper: PlatformProvider });
    act(() => result.current.setOs("macos"));
    expect(result.current.os).toBe("macos");
  });

  it("persists the choice to localStorage so it survives a reload", () => {
    const { result } = renderHook(() => usePlatform(), { wrapper: PlatformProvider });
    act(() => result.current.setOs("macos"));

    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(persisted.os).toBe("macos");

    // Simulate a fresh page load: a brand-new provider instance must read the
    // same persisted choice instead of resetting to the default.
    const { result: afterReload } = renderHook(() => usePlatform(), { wrapper: PlatformProvider });
    expect(afterReload.current.os).toBe("macos");
  });

  it("can be switched back and forth (the learner is always allowed to change it)", () => {
    const { result } = renderHook(() => usePlatform(), { wrapper: PlatformProvider });
    act(() => result.current.setOs("macos"));
    expect(result.current.os).toBe("macos");
    act(() => result.current.setOs("windows"));
    expect(result.current.os).toBe("windows");
  });
});

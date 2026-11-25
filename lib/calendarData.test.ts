import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyPatch, clearRange, eachDate, patchRange } from "./calendarData.ts";

describe("calendar patches", () => {
  it("lists an inclusive range across the new year", () => {
    assert.deepEqual(eachDate("2026-12-30", "2027-01-02"), [
      "2026-12-30",
      "2026-12-31",
      "2027-01-01",
      "2027-01-02",
    ]);
  });

  it("stores a price and a close without dropping either", () => {
    const first = patchRange({}, "2026-12-01", "2026-12-01", { price: 210 });
    const next = patchRange(first, "2026-12-01", "2026-12-01", { closed: true });
    assert.equal(next["2026-12-01"].price, 210);
    assert.equal(next["2026-12-01"].closed, true);
  });

  it("drops a patch that only opens a date back to the built-in value", () => {
    const closed = patchRange({}, "2026-12-02", "2026-12-03", { closed: true });
    const opened = patchRange(closed, "2026-12-02", "2026-12-02", { closed: false });
    assert.equal(opened["2026-12-02"], undefined);
    assert.equal(opened["2026-12-03"].closed, true);
  });

  it("clears a range and keeps a min-stay override", () => {
    const withMin = patchRange({}, "2027-07-10", "2027-07-10", { minNights: 5, note: "host" });
    assert.equal(applyPatch(undefined, { minNights: null }), null);
    assert.equal(withMin["2027-07-10"].note, "host");
    assert.deepEqual(clearRange(withMin, "2027-07-10", "2027-07-10"), {});
  });
});

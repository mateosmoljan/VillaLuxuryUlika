import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  easterArrivalWindow,
  easterSunday,
  minimumNights,
  minimumStayHint,
  minimumStayMessage,
  nightsLabel,
} from "./minStay.ts";

describe("easter", () => {
  it("matches known Western Easter Sundays", () => {
    assert.equal(easterSunday(2024), "2024-03-31");
    assert.equal(easterSunday(2026), "2026-04-05");
    assert.equal(easterSunday(2027), "2027-03-28");
  });

  it("covers Holy Thursday through Easter Monday", () => {
    assert.deepEqual(easterArrivalWindow(2027), {
      from: "2027-03-25",
      to: "2027-03-29",
    });
    assert.deepEqual(easterArrivalWindow(2026), {
      from: "2026-04-02",
      to: "2026-04-06",
    });
  });
});

describe("minimumNights boundaries", () => {
  const cases: [string, number][] = [
    ["2026-12-01", 3],
    ["2026-12-28", 3],
    ["2026-12-29", 4],
    ["2026-12-30", 4],
    ["2026-12-31", 4],
    ["2027-01-01", 4],
    ["2027-01-02", 3],
    ["2027-03-24", 3],
    ["2027-03-25", 4],
    ["2027-03-28", 4],
    ["2027-03-29", 4],
    ["2027-03-30", 3],
    ["2026-04-01", 3],
    ["2026-04-02", 4],
    ["2026-04-06", 4],
    ["2026-04-07", 3],
    ["2027-05-07", 3],
    ["2027-05-08", 4],
    ["2027-06-04", 4],
    ["2027-06-05", 7],
    ["2027-07-10", 7],
    ["2027-09-10", 7],
    ["2027-09-11", 4],
    ["2027-09-20", 4],
    ["2027-10-01", 4],
    ["2027-10-02", 3],
  ];

  for (const [arrival, nights] of cases) {
    it(`${arrival} requires ${nights}`, () => {
      assert.equal(minimumNights(arrival), nights);
    });
  }
});

describe("wording", () => {
  it("uses the specified sentences and plurals", () => {
    assert.equal(minimumStayMessage("hr", 3), "Minimalni boravak za ovaj termin je 3 noći.");
    assert.equal(minimumStayMessage("hr", 4), "Minimalni boravak za ovaj termin je 4 noći.");
    assert.equal(minimumStayMessage("hr", 7), "Minimalni boravak za ovaj termin je 7 noći.");
    assert.equal(minimumStayMessage("en", 4), "The minimum stay for these dates is 4 nights.");
    assert.equal(minimumStayMessage("de", 7), "Der Mindestaufenthalt für diesen Zeitraum beträgt 7 Nächte.");
    assert.equal(minimumStayMessage("it", 4), "Il soggiorno minimo per queste date è di 4 notti.");
    assert.equal(minimumStayHint("hr", 4), "Minimalni boravak: 4 noći.");
    assert.equal(minimumStayHint("en", 7), "Minimum stay: 7 nights.");
    assert.equal(nightsLabel("hr", 4), "4 noći");
    assert.equal(nightsLabel("en", 1), "1 night");
    assert.equal(nightsLabel("hr", 1), "1 noć");
  });
});

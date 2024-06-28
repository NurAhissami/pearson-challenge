import { formatDate } from "../date-formatter";

describe("formatDate", () => {
  it("should format date correctly for a valid date string", () => {
    const dateString = "2024-06-27T12:00:00Z";
    const result = formatDate(dateString);

    expect(result).toEqual({ day: 27, month: "jun" });
  });

  it("should format date correctly for a leap year date string", () => {
    const dateString = "2024-02-29T00:00:00Z";
    const result = formatDate(dateString);

    expect(result).toEqual({ day: 29, month: "feb" });
  });

  it("should format date correctly for a date string at the end of the year", () => {
    const dateString = "2024-12-31T23:59:59Z";
    const result = formatDate(dateString);

    expect(result).toEqual({ day: 31, month: "dic" });
  });

  it("should handle invalid date string", () => {
    const dateString = "invalid-date";
    const result = formatDate(dateString);

    expect(result).toEqual({ day: NaN, month: "Invalid Date" });
  });
});

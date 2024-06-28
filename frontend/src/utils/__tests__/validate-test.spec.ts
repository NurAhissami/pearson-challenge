import { validateDate } from "../validate-date";

describe("validateDate function", () => {
  it("sets error message and disables submit if date is earlier than today", () => {
    const setError = jest.fn();
    const setIsSubmitDisabled = jest.fn();

    const earlierDate = "2023-06-01";
    validateDate(earlierDate, setError, setIsSubmitDisabled);

    expect(setError).toHaveBeenCalledWith(
      "*The date cannot be earlier than the current date."
    );

    expect(setIsSubmitDisabled).toHaveBeenCalledWith(true);

    expect(setError).toHaveBeenCalledTimes(1);

    expect(setIsSubmitDisabled).toHaveBeenCalledTimes(1);
  });

  it("clears error message and enables submit if date is today or later", () => {
    const setError = jest.fn();
    const setIsSubmitDisabled = jest.fn();

    const today = new Date().toISOString().split("T")[0];
    validateDate(today, setError, setIsSubmitDisabled);

    expect(setError).toHaveBeenCalledWith("");

    expect(setIsSubmitDisabled).toHaveBeenCalledWith(false);

    expect(setError).toHaveBeenCalledTimes(1);

    expect(setIsSubmitDisabled).toHaveBeenCalledTimes(1);
  });
});

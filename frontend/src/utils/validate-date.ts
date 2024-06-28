export const validateDate = (
  date: string,
  setError: (error: string) => void,
  setIsSubmitDisabled: (isDisabled: boolean) => void
) => {
  const today = new Date().toISOString().split("T")[0];

  if (date < today) {
    setError("*The date cannot be earlier than the current date.");
    setIsSubmitDisabled(true);
  } else {
    setError("");
    setIsSubmitDisabled(false);
  }
};

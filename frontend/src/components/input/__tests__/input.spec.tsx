import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import { Input } from "../input";

describe("Input component", () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  it("renders input element with correct props", () => {
    render(
      <Input
        type="text"
        placeholder="Test Input"
        value=""
        onChange={handleChange}
        classname="test-class"
      />
    );

    const inputElement = screen.getByPlaceholderText("Test Input");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveClass("input__text");
    expect(inputElement).toHaveClass("test-class");
  });

  it("handles change event correctly for input", () => {
    render(
      <Input
        type="text"
        placeholder="Test Input"
        value=""
        onChange={handleChange}
        classname="test-class"
      />
    );

    const inputElement = screen.getByPlaceholderText("Test Input");

    fireEvent.change(inputElement, { target: { value: "test value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("test value");
  });

  describe("If input type `textarea`", () => {
    it("renders textarea element with correct props", () => {
      render(
        <Input
          type="textarea"
          placeholder="Test Textarea"
          value=""
          onChange={handleChange}
          classname="test-class"
        />
      );
      const textareaElement = screen.getByPlaceholderText("Test Textarea");

      expect(textareaElement).toBeInTheDocument();
      expect(textareaElement.tagName).toBe("TEXTAREA");
      expect(textareaElement).toHaveClass("input__textarea");
      expect(textareaElement).toHaveClass("test-class");
    });

    it("handles change event correctly for textarea", () => {
      render(
        <Input
          type="textarea"
          placeholder="Test Textarea"
          value=""
          onChange={handleChange}
          classname="test-class"
        />
      );

      const textareaElement = screen.getByPlaceholderText("Test Textarea");

      fireEvent.change(textareaElement, { target: { value: "test value" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test value");
    });
  });
});

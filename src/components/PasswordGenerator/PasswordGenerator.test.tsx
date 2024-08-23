import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordGenerator from "./index";

describe("PasswordGenerator", () => {
  beforeEach(() => {
    render(<PasswordGenerator />);
  });

  test('generates a password when the "Generate" button is clicked', () => {
    fireGenerateButtonClickEvent();

    const passwordElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(passwordElement.value).not.toBe("");
  });

  test("generates the password with the specified length", () => {
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "16" } });

    fireGenerateButtonClickEvent();

    const passwordElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(passwordElement.value.length).toBe(16);
  });

  test("generates the password including lowercase characters by default", () => {
    fireGenerateButtonClickEvent();

    const passwordElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(/[a-z]/.test(passwordElement.value)).toBe(true);
  });

  test("generates the password including uppercase characters when the option is enabled", () => {
    const uppercaseCheckbox = screen.getByLabelText("Include Uppercase");
    fireEvent.click(uppercaseCheckbox);

    fireGenerateButtonClickEvent();

    const passwordElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(/[A-Z]/.test(passwordElement.value)).toBe(true);
  });

  test("generates the password including numbers when the option is enabled", () => {
    const numbersCheckbox = screen.getByLabelText("Include Numbers");
    fireEvent.click(numbersCheckbox);

    fireGenerateButtonClickEvent();

    const passwordElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(/[0-9]/.test(passwordElement.value)).toBe(true);
  });

  test("generates the password including symbols when the option is enabled", () => {
    const symbolsCheckbox = screen.getByLabelText("Include Symbols");
    fireEvent.click(symbolsCheckbox);

    fireGenerateButtonClickEvent();

    const passwordElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(/[^a-zA-Z0-9]/.test(passwordElement.value)).toBe(true);
  });

  test("copies the generated password to the clipboard when the copy button is clicked", async () => {
    // Setup userEvent to stub the clipboard API
    const user = userEvent.setup();

    fireGenerateButtonClickEvent();

    const copyButton = screen.getByRole("button", {
      name: "copy password to clipboard",
    });
    await user.click(copyButton);

    const passwordElement = screen.getByRole("textbox") as HTMLInputElement;

    // Read from the stub clipboard
    const clipboardText = await navigator.clipboard.readText();

    expect(clipboardText).toEqual(passwordElement.value);
  });
});

const fireGenerateButtonClickEvent = () => {
  const generateButton = screen.getByText("Generate");
  fireEvent.click(generateButton);
};

import { MemoryRouter } from "react-router-dom";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import axios from "axios";
import CalculatorContent from "../../src/contents/CalculatorContent";

var container = null;

describe("CalculatorContent", () => {
  beforeEach(() => {
    container = render(
      <MemoryRouter>
        <CalculatorContent />
      </MemoryRouter>
    ).container;
  });

  afterEach(cleanup);

  it("renders Calculator and handles calculation correctly", async () => {
    axios.post.mockResolvedValue({
      data: {
        result: 4,
        balance: 100,
      },
    });

    fireEvent.click(
      container.querySelector("[identificator='calculator-button-2']")
    );
    fireEvent.click(
      container.querySelector("[identificator='calculator-button-+']")
    );
    fireEvent.click(
      container.querySelector("[identificator='calculator-button-2']")
    );

    expect(container.querySelector("input[readonly]")).toHaveValue("2+2");

    fireEvent.click(
      container.querySelector("[identificator='calculator-button-=']")
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    const loadingIndicator = screen.queryByText("Loading...");

    expect(loadingIndicator).not.toBeInTheDocument();
    const historyItem = screen.getByText("2+2 = 4");
    expect(historyItem).toBeInTheDocument();

    fireEvent.click(
      container.querySelector("[identificator='calculator-button-C']")
    );
    expect(container.querySelector("input[readonly]")).toHaveValue("");
  });

  it("displays an error message on calculation error", async () => {
    const error = new Error("Invalid expression");
    error.response = { data: "Invalid expression" };
    axios.post.mockRejectedValue(error);

    fireEvent.click(
      container.querySelector("[identificator='calculator-button-2']")
    );
    fireEvent.click(
      container.querySelector("[identificator='calculator-button-+']")
    );
    fireEvent.click(
      container.querySelector("[identificator='calculator-button-=']")
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    const loadingIndicator = screen.queryByText("Loading...");

    expect(loadingIndicator).not.toBeInTheDocument();

    const errorSnackbar = container.querySelector(
      "[identificator='calculator-error-snackbar']"
    );
    expect(errorSnackbar).toBeInTheDocument();
    expect(errorSnackbar.textContent).toEqual("Invalid expression");
  });
});

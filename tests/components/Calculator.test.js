import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Calculator from "../../src/components/Calculator";

var targetElement = null;
var mockRequestHandler = null;
var container = null;

describe("Calculator component", () => {
  beforeEach(() => {
    mockRequestHandler = jest.fn().mockResolvedValue(6);
    container = render(
      <MemoryRouter>
        <Calculator requestHandler={mockRequestHandler} />
      </MemoryRouter>
    ).container;
  });

  afterEach(cleanup);

  describe("rendering necessary elements", () => {
    it("- calculator history title", () => {
      const historyTitle = container.querySelector(
        "[identificator='calculator-history-title']"
      );
      expect(historyTitle).toBeInTheDocument();
    });

    it("- calculator readonly input", () => {
      targetElement = container.querySelector("input[readonly]");
      expect(targetElement).toBeInTheDocument();
      expect(targetElement).toHaveValue("");
    });

    it("- calculator buttons", () => {
      const buttons = container.querySelectorAll(
        "[identificator^='calculator-button-']"
      );
      expect(buttons).toHaveLength(22);
    });
  });

  describe("input events behavior", () => {
    beforeEach(() => {
      targetElement = container.querySelector("input[readonly]");

      fireEvent.click(
        container.querySelector("[identificator='calculator-button-1']")
      );
    });

    it("should register consecutive buttons", () => {
      expect(targetElement).toHaveValue("1");

      fireEvent.click(
        container.querySelector("[identificator='calculator-button-2']")
      );
      expect(targetElement).toHaveValue("12");

      fireEvent.click(
        container.querySelector("[identificator='calculator-button-3']")
      );
      expect(targetElement).toHaveValue("123");

      fireEvent.click(
        container.querySelector("[identificator='calculator-button-+']")
      );
      expect(targetElement).toHaveValue("123+");
    });

    it("then clears the input when pressing C", () => {
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-C']")
      );

      expect(targetElement).toHaveValue("");
    });

    it("should handle backspace correctly", () => {
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-2']")
      );
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-3']")
      );

      fireEvent.click(
        container.querySelector("[identificator='calculator-button-<-']")
      );

      expect(targetElement).toHaveValue("12");
    });

    it("should handle randomstr input", async () => {
      mockRequestHandler = jest.fn().mockResolvedValue("string");
      container = render(
        <MemoryRouter>
          <Calculator requestHandler={mockRequestHandler} />
        </MemoryRouter>
      ).container;
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-randomstr']")
      );
      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

      expect(targetElement).toHaveValue("1");
      expect(mockRequestHandler).toHaveBeenCalledTimes(1);
      expect(mockRequestHandler).toHaveBeenCalledWith("randomstr");
    });
  });

  describe("calculation behavior", () => {
    beforeEach(() => {
      mockRequestHandler = jest.fn().mockResolvedValue(6);
      container = render(
        <MemoryRouter>
          <Calculator requestHandler={mockRequestHandler} />
        </MemoryRouter>
      ).container;
      targetElement = container.querySelector("input[readonly]");
    });

    it("should clear the readonly input after pressing '='", async () => {
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-4']")
      );
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-+']")
      );
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-2']")
      );
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-=']")
      );

      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
      expect(targetElement).toHaveValue("");
    });

    it("should add the expression and result into the history", async () => {
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-4']")
      );
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-+']")
      );
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-2']")
      );
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-=']")
      );

      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
      const historyItem = container.querySelector(
        "[identificator='calculator-history-item-1']"
      );
      expect(historyItem).toBeInTheDocument();
      expect(historyItem.textContent).toEqual("4+2 = 6");
    });
  });

  describe("error handling behavior", () => {
    it("should not clear readonly input on null response", async () => {
      mockRequestHandler = jest.fn().mockResolvedValue(null);
      container = render(
        <MemoryRouter>
          <Calculator requestHandler={mockRequestHandler} />
        </MemoryRouter>
      ).container;

      targetElement = container.querySelector("input[readonly]");

      fireEvent.click(
        container.querySelector("[identificator='calculator-button-1']")
      );
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-+']")
      );
      fireEvent.click(
        container.querySelector("[identificator='calculator-button-=']")
      );

      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
      expect(targetElement).toHaveValue("1+");
    });
  });
});

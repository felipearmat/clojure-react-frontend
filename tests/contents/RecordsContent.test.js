import {
  act,
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import RecordsContent from "../../src/contents/RecordsContent";

var container = null;
var cell = null;
var row = null;
var input = null;

describe("RecordsContent component", () => {
  const mockedRecords = [
    {
      id: 1,
      amount: 10,
      created_at: "2023-11-11T12:00:00Z",
      operation_cost: 1,
      operation_id: 1,
      operation_response: "success",
      operation_type: "addition",
      updated_at: "2023-11-11T19:04:51Z",
      user_email: "test@sample.com",
      user_id: "9795401a-b8f8-467c-b4c5-ec9eab12168f",
      user_status: "active",
    },
    {
      id: 2,
      amount: 13,
      created_at: "2023-11-11T14:00:00Z",
      operation_cost: 1,
      operation_id: 2,
      operation_response: "success",
      operation_type: "subtraction",
      updated_at: "2023-11-11T19:04:51Z",
      user_email: "test@sample.com",
      user_id: "9795401a-b8f8-467c-b4c5-ec9eab12168f",
      user_status: "active",
    },
    {
      id: 3,
      amount: 17,
      created_at: "2023-11-11T16:00:00Z",
      operation_cost: 1.5,
      operation_id: 3,
      operation_response: "failed",
      operation_type: "multiplication",
      updated_at: "2023-11-11T19:04:51Z",
      user_email: "test@sample.com",
      user_id: "9795401a-b8f8-467c-b4c5-ec9eab12168f",
      user_status: "active",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    container = render(<RecordsContent />).container;
    cell = null;
    row = null;
    input = null;
  });

  afterEach(cleanup);

  it("renders 'No records available.' after rendering", () => {
    const loadingIndicator = screen.queryByText("No records available.");
    expect(loadingIndicator).toBeInTheDocument();
  });

  it("expects 'search-form-search-buttom' to be present", () => {
    const searchButton = container.querySelector(
      "[identificator='search-form-search']"
    );
    expect(searchButton).toBeInTheDocument();
  });

  describe("after clicking 'search-form-search-buttom'", () => {
    beforeEach(async () => {
      axios.get.mockResolvedValue({ data: { records: mockedRecords } });

      fireEvent.click(
        container.querySelector("[identificator='search-form-search']")
      );

      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    });

    it("renders 'search-form'", () => {
      const recordsForm = container.querySelector(
        "[identificator='search-form']"
      );
      expect(recordsForm).toBeInTheDocument();
    });

    it("renders mockedRecords rows", () => {
      row = screen.queryByText(mockedRecords[0].operation_type);
      expect(row).toBeInTheDocument();

      row = screen.queryByText(mockedRecords[1].operation_type);
      expect(row).toBeInTheDocument();

      row = screen.queryByText(mockedRecords[2].operation_type);
      expect(row).toBeInTheDocument();
    });

    it("renders __check__ input for all rows", () => {
      cell = screen.queryByText(mockedRecords[0].operation_type);
      row = cell.parentElement.parentElement;

      expect(row.querySelector("[data-field='__check__']")).toBeInTheDocument();

      cell = screen.queryByText(mockedRecords[1].operation_type);
      row = cell.parentElement.parentElement;

      expect(row.querySelector("[data-field='__check__']")).toBeInTheDocument();

      cell = screen.queryByText(mockedRecords[2].operation_type);
      row = cell.parentElement.parentElement;

      expect(row.querySelector("[data-field='__check__']")).toBeInTheDocument();
    });

    it("calls deleteRecords on deleteHandler", async () => {
      axios.delete.mockResolvedValue({
        data: { message: "1 record deleted sucessfully!" },
      });

      cell = screen.queryByText(mockedRecords[0].operation_type);
      row = cell.parentElement.parentElement;
      input = row.querySelector("[data-field='__check__']");

      fireEvent.click(input);

      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

      const deletButton = container.querySelector(
        "[identificator='records-form-delete']"
      );

      fireEvent.click(deletButton);

      await waitFor(() => {
        axios.get.mockResolvedValue({
          data: { records: mockedRecords.slice(1) },
        });

        const alert = container.querySelector(
          "[identificator='records-error-snackbar']"
        );

        expect(alert).toBeInTheDocument();
        expect(alert.textContent).toContain("1 record deleted sucessfully!");

        row = screen.queryByText(mockedRecords[0].operation_type);
        expect(row).toBeNull();

        row = screen.queryByText(mockedRecords[1].operation_type);
        expect(row).toBeInTheDocument();

        row = screen.queryByText(mockedRecords[2].operation_type);
        expect(row).toBeInTheDocument();
      });
    });
  });

  it("renders alert on error", async () => {
    const error = new Error("No connetion");
    error.response = { data: "No connetion" };
    axios.get.mockRejectedValue(error);

    fireEvent.click(
      container.querySelector("[identificator='search-form-search']")
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    const alert = container.querySelector(
      "[identificator='records-error-snackbar']"
    );
    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toContain("No connetion");
  });
});

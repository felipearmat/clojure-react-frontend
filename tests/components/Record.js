import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Records from "../../src/contents/RecordsContent";

describe("Records Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Records />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test("renders SearchForm and no records available message when no records are loaded", () => {
    const searchForm = screen.getByText("Search");
    expect(searchForm).toBeInTheDocument();

    const noRecordsMessage = screen.getByText("No records available.");
    expect(noRecordsMessage).toBeInTheDocument();
  });

  test("fetches and displays records when data is loaded", async () => {
    const recordsData = [
      {
        amount: 3.5,
        user_email: "test@sample.com",
        operation_response: "3z7R5zp4UUWigms2k7CGxyeFlPfFDltj",
        operation_id: 7,
        updated_at: "2023-10-24T22:16:51Z",
        id: 218,
        operation_cost: 3.5,
        user_id: "a8fdf9fe-4d05-4d36-8fed-2739c3d5964a",
        created_at: "2023-10-24T22:16:51Z",
        operation_type: "random_string",
        user_status: "active",
      },
      {
        amount: 1.5,
        user_email: "test@sample.com",
        operation_response: "11584",
        operation_id: 3,
        updated_at: "2023-10-24T22:16:50Z",
        id: 217,
        operation_cost: 1.5,
        user_id: "a8fdf9fe-4d05-4d36-8fed-2739c3d5964a",
        created_at: "2023-10-24T22:16:50Z",
        operation_type: "multiplication",
        user_status: "active",
      },
      {
        amount: 3.5,
        user_email: "test@sample.com",
        operation_response: "2y8UD3qvYOYTRHoyY78bWV18IcYplSrs",
        operation_id: 7,
        updated_at: "2023-10-24T22:16:43Z",
        id: 216,
        operation_cost: 3.5,
        user_id: "a8fdf9fe-4d05-4d36-8fed-2739c3d5964a",
        created_at: "2023-10-24T22:16:43Z",
        operation_type: "random_string",
        user_status: "active",
      },
    ];

    axios.get.mockResolvedValue({ data: { records: recordsData } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    // Wait for the records to load
    await waitFor(() => {
      recordsData.forEach((record) => {
        const formattedDate =
          new Date(record.created_at).toISOString().slice(0, 19) + " UTC";
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
        expect(screen.getByText(record.operation_type)).toBeInTheDocument();
        expect(
          screen.getByText(Number.parseFloat(record.amount).toFixed(2))
        ).toBeInTheDocument();
        expect(screen.getByText(record.operation_response)).toBeInTheDocument();
      });
    });
  });

  test("displays a message when no records are found", async () => {
    axios.get.mockResolvedValue({ data: { records: [] } });

    // Trigger the search
    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    // Wait for the "No records available" message
    await waitFor(() => {
      const noRecordsMessage = screen.getByText("No records available.");
      expect(noRecordsMessage).toBeInTheDocument();
    });
  });

  // Add more tests for other interactions and edge cases
});

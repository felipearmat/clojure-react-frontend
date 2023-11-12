import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import axios from "axios";
import RecordsContent from "../../src/contents/RecordsContent";

describe("RecordsContent component", () => {
  beforeEach(() => {
    render(<RecordsContent />);
  });

  afterEach(cleanup);

  it("renders the RecordsContent component", () => {
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("fetches records when the Search button is clicked", async () => {
    const mockResponse = {
      data: {
        records: [
          { id: 1, description: "Record 1" },
          { id: 2, description: "Record 2" },
        ],
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    await act(async () => {
      await screen.findByText("Loading...");
      await screen.findByText("Record 1");
      await screen.findByText("Record 2");
    });

    expect(screen.getByText("Your Records")).toBeInTheDocument();
    expect(screen.getByText("Record 1")).toBeInTheDocument();
    expect(screen.getByText("Record 2")).toBeInTheDocument();
  });

  it("deletes records when the Delete button is clicked", async () => {
    const mockDeleteResponse = {
      data: {
        balance: 100,
      },
    };
    axios.delete.mockResolvedValueOnce(mockDeleteResponse);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await act(async () => {
      await screen.findByText("Loading...");
    });

    expect(screen.getByText("Balance: 100")).toBeInTheDocument();
    expect(screen.queryByText("Record 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Record 2")).not.toBeInTheDocument();
  });

  it("displays an error when record deletion fails", async () => {
    const errorMessage = "Error deleting records: Internal Server Error";
    axios.delete.mockRejectedValueOnce(new Error(errorMessage));

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await act(async () => {
      await screen.findByText("Loading...");
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

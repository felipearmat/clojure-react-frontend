import { Alert, Container, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { userState } from "../stores/userState";
import { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import RecordsForm from "../components/RecordsForm";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
  text-align: left;
`;

const RecordsContent = () => {
  const [alert, setAlert] = useState({ type: "error", message: "" });
  const [lastSearch, setLastSearch] = useState({});
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    operationType: "",
    operationCost: "",
    amountOperator: "",
    amountValue: "",
    startDate: "",
    endDate: "",
  });

  const deleteHandler = async (params) => {
    try {
      const response = await axios.delete("/api/v1/records/", {
        data: { records: params.map((record) => record.id) },
      });
      const data = response?.data;
      setAlert({ type: "success", message: data?.message });
      userState.set({
        balance: data?.balance,
      });
      searchHandler(lastSearch);
    } catch (error) {
      setAlert({ type: "error", message: `Error deleting records: ${error}` });
    }
  };

  const searchHandler = async (params) => {
    setLoading(true);
    setLastSearch(params);
    try {
      const response = await axios.get("/api/v1/records", { params });
      const data = response?.data?.records;
      if (Array.isArray(data)) {
        setRecords(data);
      }
    } catch (error) {
      setAlert({ type: "error", message: `Error fetching records: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <Loading isLoading={loading}>
        <RecordsForm
          records={records}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          searchHandler={searchHandler}
          deleteHandler={deleteHandler}
        />
      </Loading>
      {alert.message && (
        <Snackbar
          identificator="records-error-snackbar"
          open={true}
          autoHideDuration={5000}
          onClose={() => setAlert({ type: "error", message: "" })}
        >
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Snackbar>
      )}
    </StyledContainer>
  );
};

export default RecordsContent;

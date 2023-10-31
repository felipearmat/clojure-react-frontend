import { Alert, Container, Snackbar } from "@mui/material";
import { recordsStore } from "../stores/recordsStore";
import { styled } from "@mui/material/styles";
import { userStore } from "../stores/userStore";
import { useState, useSyncExternalStore } from "react";
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
  const records = useSyncExternalStore(
    recordsStore.subscribe,
    recordsStore.get
  );
  const [alert, setAlert] = useState({ type: "error", message: "" });
  const [lastSearch, setLastSearch] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    operationType: "",
    operationCost: "",
    amountOperator: "",
    amountValue: "",
    startDate: "",
    endDate: "",
  });

  const searchHandler = (params) => {
    setLoading(true);
    setLastSearch(params);
    recordsStore.fetchRecords(params).then((result) => {
      if (result.type === "success") {
        recordsStore.set(result.data);
      } else {
        setAlert(result);
      }
      setLoading(false);
    });
  };

  const deleteHandler = (records) => {
    setLoading(true);
    recordsStore.deleteRecords(records).then((result) => {
      if (result.type === "success") {
        setAlert(result);
        userStore.set({
          balance: result.balance,
        });
        searchHandler(lastSearch);
      } else {
        setAlert(result);
      }
      setLoading(false);
    });
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

import { Button, Container, IconButton, Typography } from "@mui/material";
import { formatCurrency } from "../helpers/Util";
import { styled } from "@mui/system";
import { useGridApiRef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchForm from "./SearchForm";
import XDataGrid from "./XDataGrid";

const StyledButton = styled(Button)({
  margin: "0 0.75rem",
});

const RecordsForm = ({
  searchParams,
  setSearchParams,
  records,
  searchHandler,
  deleteHandler,
}) => {
  const apiRef = useGridApiRef();

  const getSelectedRows = (apiRef) => {
    const result = [];
    apiRef.current.getSelectedRows().forEach((value) => {
      result.push(value);
    });
    return result;
  };

  const totalAmount = (records) => {
    return records.reduce((acc, record) => acc + record.amount, 0);
  };

  const formatDateString = (dateString) => {
    return new Date(dateString).toISOString().slice(0, 19) + " UTC";
  };

  const headers = [
    {
      field: "created_at",
      headerName: "Date",
      flex: 1.15,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatDateString(value),
    },
    {
      field: "operation_type",
      headerName: "Operation Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 0.75,
      headerAlign: "center",
      align: "center",
      valueFormatter: ({ value }) => formatCurrency(value),
    },
    {
      field: "operation_response",
      headerName: "Response",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton color="error" onClick={() => deleteHandler([params])}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <SearchForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        searchCallBack={searchHandler}
      >
        <StyledButton
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => deleteHandler(getSelectedRows(apiRef))}
        >
          Delete
        </StyledButton>
      </SearchForm>
      <Container>
        {records.length > 0 ? (
          <>
            <div>
              <XDataGrid
                title="Records"
                rows={records}
                apiRef={apiRef}
                columns={headers}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                checkboxSelection
              />
            </div>
            <Typography>
              Total Amount: {formatCurrency(totalAmount(records))}
            </Typography>
          </>
        ) : (
          <Typography variant="h6" gutterBottom>
            No records available.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default RecordsForm;

import { Container } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { userStore } from "../stores/userStore";
import { useState } from "react";
import axios from "axios";
import Calculator from "../components/Calculator";
import Loading from "../components/Loading";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: left;
`;

const CalculatorContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestHandler = async (expression) => {
    if (!expression) return;
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/calculate", { expression });
      const data = response.data;
      if (data?.balance) {
        userStore.set({
          balance: data.balance,
        });
      }
      return data.result;
    } catch (error) {
      setError(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <Loading isLoading={loading}>
        <Calculator requestHandler={requestHandler} />
      </Loading>
      {error && (
        <Snackbar
          identificator="calculator-error-snackbar"
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </StyledContainer>
  );
};

export default CalculatorContent;

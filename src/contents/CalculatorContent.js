import { calculatorStore } from "../stores/calculatorStore";
import { Container } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { userStore } from "../stores/userStore";
import { useState } from "react";
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

    calculatorStore.calculate(expression).then((response) => {
      if (response.type === "success" && response.balance) {
        userStore.set({
          balance: response.balance,
        });
      } else if (response.type === "error") {
        setError(response.message);
      }
      setLoading(false);
    });
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

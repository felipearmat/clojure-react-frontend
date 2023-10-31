import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import PropTypes from "prop-types";

const StyledInput = styled(TextField)`
  width: 100%;
  margin-bottom: 16px;
  text-align: left;
`;

const StyledButton = styled(Button)(({ _theme }) => ({
  margin: "4px",
  textAlign: "left",
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  padding: "8px 12px",
  "&:hover": {
    backgroundColor: "#DCEAF9",
  },
}));

const buttonArrays = [
  ["7", "8", "9", "/", "C", "<-"],
  ["4", "5", "6", "*", "(", ")"],
  ["1", "2", "3", "-", "√("],
  [".", "0", "=", "+", "randomstr"],
];

var historyState = [];

const Calculator = ({ requestHandler }) => {
  const [expression, setExpression] = useState([]);

  const readExpression = (expression) => {
    return (Array.isArray(expression) && expression.join("")) || "";
  };

  const handleRequest = async (expression) => {
    const result = await requestHandler(expression);
    if (!result) return;

    historyState = [...historyState, `${expression} = ${result}`].slice(-10);
    setExpression([]);
  };

  const handleInput = (symbol) => {
    switch (symbol) {
      case "C":
        setExpression([]);
        break;
      case "<-":
        setExpression((prevExpression) => prevExpression.slice(0, -1));
        break;
      case "randomstr":
        handleRequest("randomstr");
        break;
      case "=":
        handleRequest(readExpression(expression));
        break;
      default:
        setExpression((prevExpression) => [...prevExpression, symbol]);
    }
  };

  return (
    <div>
      <h4 identificator="calculator-history-title">History:</h4>
      {historyState.map((item, index) => (
        <Typography
          identificator={`calculator-history-item-${index}`}
          key={`history${index}`}
        >
          {item}
        </Typography>
      ))}
      <form>
        <StyledInput
          value={readExpression(expression)}
          readOnly
          InputProps={{
            readOnly: true,
          }}
        />
        {buttonArrays.map((buttonRow, index) => (
          <div key={`row${index}`} style={{ display: "flex" }}>
            {buttonRow.map((label) => (
              <StyledButton
                key={`label${label}`}
                identificator={`calculator-button-${label}`}
                onClick={() => handleInput(label)}
              >
                {label}
              </StyledButton>
            ))}
          </div>
        ))}
      </form>
    </div>
  );
};

Calculator.propTypes = {
  requestHandler: PropTypes.func.isRequired,
};

export default Calculator;

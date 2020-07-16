import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TextField, NativeSelect, Button } from "@material-ui/core";
import BootstrapInput from "./CashflowStyle";
import { useStyles } from "./CashflowStyle";
import Totals from "../Totals/Totals";
import SubmitClear from "./Submit/SubmitClear";

const Cashflow = ({ localValues, initValues }) => {
  const classes = useStyles();
  const [titles] = useState(["Income", "Expense", "Type", "Comment"]);
  const [state, setstate] = useState(localValues);
  const [rows, setRows] = useState([1, 2, 3, 4, 5]);

  const handleAddLine = () => {
    localValues.push({ Income: "", Expense: "", Type: "", Comment: "" });
    localStorage.setItem("local", JSON.stringify(localValues));
    setstate(() => {
      let newState = [...localValues];
      return newState;
    });
    const newRow = [...rows, rows.pop() + 1];
    setRows(newRow);
  };

  const handleRemoveLine = () => {
    if (localValues.length > 5) {
      localValues.pop();
      localStorage.setItem("local", JSON.stringify(localValues));
      setstate(() => {
        let newState = [...localValues];
        return newState;
      });
      rows.pop();
      const newRow = [...rows];
      setRows(newRow);
    }
  };

  const handleValueChange = (rowIndex, title, e) => {
    e.persist();
    localValues[rowIndex][title] = e.target.value;
    localStorage.setItem("local", JSON.stringify(localValues));
    setstate(() => {
      let newState = [...localValues];
      return newState;
    });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {titles.map(t => {
                return (
                  <TableCell key={t}>
                    <h2>{t}</h2>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {localValues.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {titles.map((title, index) => {
                  return (
                    <TableCell key={title} id={rows[rowIndex]} className={classes.root}>
                      {index === 2 ? (
                        <NativeSelect
                          className={
                            (state[rowIndex]["Expense"] !== "" && state[rowIndex]["Type"] === "") ||
                            (state[rowIndex]["Income"] !== "" && state[rowIndex]["Type"] === "")
                              ? classes.alert
                              : ""
                          }
                          input={<BootstrapInput defaultValue={localValues[rowIndex][title]} />}
                          onChange={e => handleValueChange(rowIndex, title, e)}>
                          <option aria-label='None' value=''></option>
                          <option value={"Cash"}>Cash</option>
                          <option value={"Credit Card"}>Credit Card</option>
                        </NativeSelect>
                      ) : (
                        <TextField
                          type={title === "Income" || title === "Expense" ? "number" : "text"}
                          className={
                            (title === "Income" && state[rowIndex]["Expense"] !== "") ||
                            (title === "Expense" && state[rowIndex]["Income"] !== "")
                              ? classes.disableStyle
                              : "" + title === "Income" && state[rowIndex]["Type"] === "Cash"
                              ? classes.cash
                              : "" + title === "Income" && state[rowIndex]["Type"] === "Credit Card"
                              ? classes.pos
                              : "" + title === "Comment"
                              ? classes.comment
                              : ""
                          }
                          key={title}
                          rownumber={rows[rowIndex]}
                          variant='outlined'
                          value={state[rowIndex][title]}
                          disabled={
                            (title === "Income" && state[rowIndex]["Expense"] !== "") ||
                            (title === "Expense" && state[rowIndex]["Income"] !== "")
                              ? true
                              : false
                          }
                          onChange={e => {
                            handleValueChange(rowIndex, title, e);
                          }}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.buttonContainer}>
          <Button className={classes.buttonLeft} variant='contained' color='primary' onClick={handleAddLine}>
            Add Line
          </Button>
          <Button className={classes.buttonRight} variant='contained' color='secondary' onClick={handleRemoveLine}>
            Remove Line
          </Button>
        </div>
      </TableContainer>
      <Totals localValues={localValues} initValues={initValues} />
      <SubmitClear />
    </div>
  );
};
export default Cashflow;

import React, { useState } from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  TextField,
} from "@material-ui/core";

import { useStyles } from "../secondPageStyle";
const CheckOut = ({ localCheckout }) => {
  const classes = useStyles();
  const [titles] = useState(["Guest", "Room"]);
  const [rows, setRows] = useState([1, 2, 3, 4, 5]);
  const [state, setstate] = useState(localCheckout);

  const handleValueChange = (rowIndex, title, e) => {
    e.persist();
    localCheckout[rowIndex][title] = e.target.value;
    localStorage.setItem("localCheckout", JSON.stringify(localCheckout));
    setstate(() => {
      let newState = [...localCheckout];
      return newState;
    });
  };

  const handleAddLine = () => {
    localCheckout.push({ Guest: "", Room: "", "Check-In": null, "Check-Out": null, Pers: "", Debt: "", Source: "" });
    localStorage.setItem("localCheckout", JSON.stringify(localCheckout));
    setstate(() => {
      let newState = [...localCheckout];
      return newState;
    });
    const newRow = [...rows, rows.pop() + 1];
    setRows(newRow);
  };

  const handleRemoveLine = () => {
    if (localCheckout.length > 5) {
      localCheckout.pop();
      localStorage.setItem("localCheckout", JSON.stringify(localCheckout));
      setstate(() => {
        let newState = [...localCheckout];
        return newState;
      });
      rows.pop();
      const newRow = [...rows];
      setRows(newRow);
    }
  };
  return (
    <TableContainer component={Paper}>
      <h2>Check-outs</h2>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {titles.map(t => {
              return (
                <TableCell key={t}>
                  <h3>{t}</h3>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {localCheckout &&
            localCheckout.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {titles.map((title, index) => {
                  return (
                    <TableCell key={title} id={rows[rowIndex]} className={classes.root}>
                      <TextField
                        className={classes.even}
                        key={title}
                        rownumber={rows[rowIndex]}
                        variant='outlined'
                        value={state[rowIndex][title]}
                        onChange={e => {
                          handleValueChange(rowIndex, title, e);
                        }}
                      />
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
  );
};

export default CheckOut;

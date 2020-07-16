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
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { useStyles } from "../secondPageStyle";

const CheckIn = ({ localCheckin }) => {
  const classes = useStyles();
  const [titles] = useState(["Guest", "Room", "Check-In", "Check-Out", "Pers", "Debt", "Source"]);
  const [state, setstate] = useState(localCheckin);
  const [rows, setRows] = useState([1, 2, 3, 4, 5]);

  const handleDateChange = (e, rowIndex, title) => {
    let pickedDate = e.toLocaleDateString();
    localCheckin[rowIndex][title] = pickedDate;
    localStorage.setItem("localCheckin", JSON.stringify(localCheckin));
    setstate(() => {
      let newState = [...localCheckin];
      return newState;
    });
  };

  const handleValueChange = (rowIndex, title, e) => {
    e.persist();
    localCheckin[rowIndex][title] = e.target.value;
    localStorage.setItem("localCheckin", JSON.stringify(localCheckin));
    setstate(() => {
      let newState = [...localCheckin];
      return newState;
    });
  };

  const handleAddLine = () => {
    localCheckin.push({ Guest: "", Room: "", "Check-In": null, "Check-Out": null, Pers: "", Debt: "", Source: "" });
    localStorage.setItem("localCheckin", JSON.stringify(localCheckin));
    setstate(() => {
      let newState = [...localCheckin];
      return newState;
    });
    const newRow = [...rows, rows.pop() + 1];
    setRows(newRow);
  };

  const handleRemoveLine = () => {
    if (localCheckin.length > 5) {
      localCheckin.pop();
      localStorage.setItem("localCheckin", JSON.stringify(localCheckin));
      setstate(() => {
        let newState = [...localCheckin];
        return newState;
      });
      rows.pop();
      const newRow = [...rows];
      setRows(newRow);
    }
  };

  return (
    <TableContainer component={Paper}>
      <h2>Check-ins</h2>
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
          {localCheckin &&
            localCheckin.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {titles.map((title, index) => {
                  return (
                    <TableCell key={title} id={rows[rowIndex]} className={classes.root}>
                      {index === 2 || index === 3 ? (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            autoOk
                            format='dd/MM/yyyy'
                            inputVariant='outlined'
                            variant='inline'
                            placeholder='Choose Date'
                            value={state[rowIndex][title]}
                            onChange={e => handleDateChange(e, rowIndex, title)}
                          />
                        </MuiPickersUtilsProvider>
                      ) : (
                        <TextField
                          type={title === "Room" || title === "Pers" || title === "Debt" ? "number" : "text"}
                          key={title}
                          rownumber={rows[rowIndex]}
                          variant='outlined'
                          value={state[rowIndex][title]}
                          className={title === "Guest" || title === "Source" ? classes.guestAndSource : ""}
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
      <hr />
    </TableContainer>
  );
};

export default CheckIn;

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
  NativeSelect,
} from "@material-ui/core";

import BootstrapInput, { useStyles } from "../secondPageStyle";

const Products = ({ localProducts }) => {
  const classes = useStyles();
  const [titles] = useState(["Type", "Room", "Guest", "Price", "Comments"]);
  const [rows, setRows] = useState([1, 2, 3, 4, 5]);
  const [state, setstate] = useState(localProducts);

  const handleValueChange = (rowIndex, title, e) => {
    e.persist();
    localProducts[rowIndex][title] = e.target.value;
    localStorage.setItem("localProducts", JSON.stringify(localProducts));
    setstate(() => {
      let newState = [...localProducts];
      return newState;
    });
  };

  const handleAddLine = () => {
    localProducts.push({ Guest: "", Room: "", "Check-In": null, "Check-Out": null, Pers: "", Debt: "", Source: "" });
    localStorage.setItem("localProducts", JSON.stringify(localProducts));
    setstate(() => {
      let newState = [...localProducts];
      return newState;
    });
    const newRow = [...rows, rows.pop() + 1];
    setRows(newRow);
  };

  const handleRemoveLine = () => {
    if (localProducts.length > 5) {
      localProducts.pop();
      localStorage.setItem("localProducts", JSON.stringify(localProducts));
      setstate(() => {
        let newState = [...localProducts];
        return newState;
      });
      rows.pop();
      const newRow = [...rows];
      setRows(newRow);
    }
  };

  return (
    <TableContainer component={Paper}>
      <h2>Products</h2>
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
          {localProducts &&
            localProducts.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {titles.map((title, index) => {
                  return (
                    <TableCell key={title} id={rows[rowIndex]} className={classes.root}>
                      {index === 0 ? (
                        <NativeSelect
                          input={<BootstrapInput defaultValue={localProducts[rowIndex][title]} />}
                          onChange={e => handleValueChange(rowIndex, title, e)}>
                          <option aria-label='None' value=''></option>
                          <option value={"Tour"}>Tour</option>
                          <option value={"Minibar"}>Minibar</option>
                          <option value={"Transfer"}>Transfer</option>
                          <option value={"Souvenir"}>Souvenir</option>
                          <option value={"Penalty"}>Penalty</option>
                        </NativeSelect>
                      ) : (
                        <TextField
                          className={title === "Guest" || title === "Comments" ? classes.guestAndSource : ""}
                          key={title}
                          rownumber={rows[rowIndex]}
                          variant='outlined'
                          value={state[rowIndex][title]}
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

export default Products;

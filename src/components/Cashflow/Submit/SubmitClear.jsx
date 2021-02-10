import React from "react";
import { Button } from "@material-ui/core";
import XLSX from "xlsx";
import { useStyles } from "../CashflowStyle";

const SubmitClear = () => {
  const classes = useStyles();
  let localValues = JSON.parse(localStorage.getItem("local"));
  let localCheckin = JSON.parse(localStorage.getItem("localCheckin"));
  let localProducts = JSON.parse(localStorage.getItem("localProducts"));
  let localCheckout = JSON.parse(localStorage.getItem("localCheckout"));

  const handleClear = () =>
    window.confirm("Your are about to start a new shift! Are you sure?")
      ? localStorage.clear(window.location.reload())
      : null;

  const handleSubmit = () => {
    let ws_name = "Cashflow";
    let ws2_name = "Checkins";
    let ws3_name = "Products";
    let ws4_name = "Checkouts";
    let filename = "cashflow.xlsx";
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(localValues);
    let worksheet_2 = XLSX.utils.json_to_sheet(localCheckin);
    let worksheet_3 = XLSX.utils.json_to_sheet(localProducts);
    let worksheet_4 = XLSX.utils.json_to_sheet(localCheckout);
    XLSX.utils.book_append_sheet(workbook, worksheet, ws_name);
    XLSX.utils.book_append_sheet(workbook, worksheet_2, ws2_name);
    XLSX.utils.book_append_sheet(workbook, worksheet_3, ws3_name);
    XLSX.utils.book_append_sheet(workbook, worksheet_4, ws4_name);
    XLSX.writeFile(workbook, filename);
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleSubmit} className={classes.submitAndClear}>
        Submit
      </Button>
      <Button variant='contained' color='secondary' onClick={handleClear} className={classes.submitAndClear}>
        New Shift
      </Button>
    </div>
  );
};

export default SubmitClear;

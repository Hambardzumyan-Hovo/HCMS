import React from "react";
import styles from "./Totals.module.css";

const Totals = ({ localValues }) => {
  let [incomeValues, expValues, cashValues, posValues] = [[0], [0], [0], [0]];

  localValues.map(lv => expValues.push(Number(lv.Expense)));
  localValues.map(lv => lv.Type === "Cash" && cashValues.push(Number(lv.Income)));
  localValues.map(lv => lv.Type === "Credit Card" && posValues.push(Number(lv.Income)));

  const sum = incomeValues.reduce((total, current) => {
    return total + current;
  });
  const exp = expValues.reduce((total, current) => {
    return total + current;
  });
  const cash = cashValues.reduce((total, current) => {
    return total + current;
  });
  const pos = posValues.reduce((total, current) => {
    return total + current;
  });

  return (
    <div className={styles.totals}>
      <p>Total Income: {sum}</p>
      <p>Cash: {cash}</p>
      <p>Credit Card: {pos}</p>
      <hr />
      <p>Total Expenses: {exp}</p>
    </div>
  );
};

export default Totals;

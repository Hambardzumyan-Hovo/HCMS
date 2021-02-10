import React from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "./ShiftStyle";
import { useState } from "react";

const Shift = props => {
  const classes = useStyles();
  const [shift] = useState(["From", "Current", "To"]);

  const handleBlur = e => {
    localStorage.setItem(shift[e.target.name], e.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      {shift.map((s, index) => {
        return (
          <TextField
            key={s}
            label={s}
            name={index.toString()}
            onBlur={handleBlur}
            defaultValue={localStorage.getItem(s)}
          />
        );
      })}
    </form>
  );
};

export default Shift;

import { InputBase, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 1200,
    margin: "auto",
  },
  disableStyle: { backgroundColor: "grey" },

  alert: {
    borderColor: "#D13535",
    boxShadow: "0px 0px 5px 2px #D13535",
    animation: "pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1)",
  },
  cash: {
    borderColor: "#21CD48",
    boxShadow: "0px 0px 5px 2px #219948",
  },
  pos: {
    borderColor: "#2CA9C4",
    boxShadow: "0px 0px 5px 2px #2CC9D2",
  },
  comment: {
    width: 600,
  },
  submitAndClear: { margin: 20 },
  root: { padding: 0 },
  buttonContainer: { display: "flex", justifyContent: "center", marginTop: 35, marginBottom: 35 },
  buttonLeft: { margin: "auto", position: "absolute", left: 0 },
  buttonRight: { margin: "auto", position: "absolute", right: 0 },
});

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
export default BootstrapInput;

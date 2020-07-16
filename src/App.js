import React from "react";
import "./App.css";
import Cashflow from "./components/Cashflow/Cashflow";
import { Button } from "@material-ui/core";
import { NavLink, Route, BrowserRouter } from "react-router-dom";
import SecondPage from "./components/SecondPage/SecondPage";
import Shift from "./components/Shift/Shift";

function App() {
  let localValues = JSON.parse(localStorage.getItem("local"));
  let localCheckin = JSON.parse(localStorage.getItem("localCheckin"));
  let localProducts = JSON.parse(localStorage.getItem("localProducts"));
  let localCheckout = JSON.parse(localStorage.getItem("localCheckout"));

  const rows = [1, 2, 3, 4, 5];
  const initValues = rows.map(row => {
    return { Income: "", Expense: "", Type: "", Comment: "" };
  });

  const initCheckinValues = rows.map(row => {
    return { Guest: "", Room: "", "Check-In": null, "Check-Out": null, Pers: "", Debt: "", Source: "" };
  });

  const initProductValues = rows.map(row => {
    return { Type: "", Room: "", Guest: "", Price: "", Comments: "" };
  });

  const initCheckoutValues = rows.map(row => {
    return { Guest: "", Room: "" };
  });

  if (localValues === null) {
    localStorage.setItem("local", JSON.stringify(initValues));
    localStorage.setItem("localCheckin", JSON.stringify(initCheckinValues));
    localStorage.setItem("localProducts", JSON.stringify(initProductValues));
    localStorage.setItem("localCheckout", JSON.stringify(initCheckoutValues));
  }

  return (
    <BrowserRouter>
      <Route
        exact
        path='/'
        render={() => (
          <div className='App'>
            <NavLink to='/secondPage'>
              <Button variant='contained' color='primary'>
                Second page
              </Button>
            </NavLink>
            <h2>Hotel Cashflow Management System</h2>
            <Shift />
            <Cashflow localValues={localValues !== null ? localValues : initValues} initValues={initValues} />
          </div>
        )}
      />

      <Route
        path='/secondPage'
        render={() => (
          <div className='App'>
            <SecondPage
              localCheckin={localCheckin !== null ? localCheckin : initCheckinValues}
              localProducts={localProducts !== null ? localProducts : initProductValues}
              localCheckout={localCheckout !== null ? localCheckout : initCheckoutValues}
            />
          </div>
        )}
      />
    </BrowserRouter>
  );
}

export default App;

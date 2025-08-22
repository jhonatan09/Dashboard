import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Payment from "../pages/Payment";
import Home from "../pages/Home";
import Menu from "../component/Header";
import Order from "../pages/Order";
import Register from "../pages/Register";

function Routers() {
  const user = localStorage.getItem("@Provi:user");
  const location = useLocation();
  const currentUrl = location.pathname;

  const noHeaderRoutes = ["/Dashboard", "/Dashboard/register"];

  return (
    <div className="main">
      {!noHeaderRoutes.includes(location.pathname) ? (
        <>
          <Menu />
          <Switch>
            <Route exact path="/Dashboard/home">
              <Home />
            </Route>
            <Route exact path="/Dashboard/pay">
              <Payment />
            </Route>
            <Route exact path="/Dashboard/order">
              <Order />
            </Route>
          </Switch>
        </>
      ) : (
        <Switch>
          <Route exact path="/Dashboard">
            <Login />
          </Route>
          <Route exact path="/Dashboard/register">
            <Register />
          </Route>
        </Switch>
      )}

      <Redirect
        to={{
          pathname: !user ? "/Dashboard" : currentUrl,
        }}
      />
    </div>
  );
}

export default Routers;

import React, {useEffect} from "react";
import {Switch, Route, Redirect, useLocation} from 'react-router-dom';
import Login from '../pages/Login';
import Payment from '../pages/Payment';
import Home from '../pages/Home';
import Menu from '../component/Header';
import Order from '../pages/Order';
import '../styleglobal/main.scss';

function Routers (){
    const user = localStorage.getItem('@Provi:user');
    const location = useLocation();
    const currentUrl = location.pathname ;
    return(
        <div className="main">
                {location.pathname !== '/Dashboard/' ?
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
                    : 
                    <Route exact path="/Dashboard/">
                        <Login />
                    </Route>
                }

                <Redirect
                        to={{
                            pathname: 
                            !user? '/Dashboard' : currentUrl

                        }}
                />
        </div>
    )
} 


export default Routers;
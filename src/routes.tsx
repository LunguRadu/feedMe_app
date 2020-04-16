import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/SearchResultsPage/SearchResultsPage';
//import About from './pages/About/About';
import React from "react";

const Routes = () =>(
<BrowserRouter>
<Switch>
    <Route exact path='/' componet={Home}/>
    <Route exact path='/about' componet={Home}/>
</Switch>
</BrowserRouter>
);
export default Routes
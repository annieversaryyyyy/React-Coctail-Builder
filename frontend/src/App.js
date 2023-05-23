import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";
import NewCocktail from "./containers/NewCocktail/NewCocktail";
import Cocktails from "./containers/Cocktails/Cocktails";
import ViewMyCocktails from "./containers/ViewMyCocktails/ViewMyCocktails";
import CocktailInfo from "./containers/CocktailInfo/CocktailInfo";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/' exact component={Cocktails}/>
              <ProtectedRoute
                  isAllowed={user}
                  redirectTo="/login"
                  path="/cocktail/new"
                  component={NewCocktail}
              />
              <ProtectedRoute
                isAllowed={user}
                redirectTo="/login"
                path="/view/cocktails"
                component={ViewMyCocktails}
              />
              <Route path='/cocktails/:id' component={CocktailInfo}/>
            </Switch>
        </Layout>
    );
};

export default App;
import React from "react";
import { Provider } from 'react-redux';
import { ConfigureStore } from '../packs/redux/configureStore';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import TariffsByCategory from '../packs/tariffs_by_category';
import AccountsByFlat from '../packs/account/accounts_by_flat';
import UtilitiesByFlat from '../packs/utilities_by_flat';
import Categories from "../components/Categories";
// import Recipes from "../components/Recipes";
// import Recipe from "../components/Recipe";
// import NewRecipe from "../components/NewRecipe";

// export default (
const store = ConfigureStore();

// export default class App extends React.Component{
//   render() {
//     return(
    export default (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/categories" exact component={Categories} />
            <Route exact path='/tariffs' component={() => <TariffsByCategory />} />
            <Route path='/flats/:flatId/accounts' component={() => <AccountsByFlat />} />
            <Route path='/flats/:flatId/utilities' component={() => <UtilitiesByFlat />} />
            {/*<Route path="/tariffs" exact component={Recipes} />
            <Route path="/recipe/:id" exact component={Recipe} />
            <Route path="/recipe" exact component={NewRecipe} />
            <Route exact path='/' component={() => <TariffsByCategory />} />*/}
          </Switch>
        </Router>
      </Provider>
    );
  // };
// }

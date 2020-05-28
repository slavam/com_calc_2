import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import TariffsByCategory from './tariffs_by_category';
import AccountsByFlat from './account/accounts_by_flat';
import UtilitiesByFlat from './utilities_by_flat';
import {connect} from 'react-redux';

const store = ConfigureStore();

class App extends React.Component{
  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <TariffsByCategory />} />
            <Route exact path='/tariffs' component={() => <TariffsByCategory />} />
            <Route path='/flats/:flatId/accounts' component={() => <AccountsByFlat />} />
            <Route path='/flats/:flatId/utilities' component={() => <UtilitiesByFlat />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default withRouter(connect(null)(App));
ReactDOM.render(<App />, document.getElementById('root'));

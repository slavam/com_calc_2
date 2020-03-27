import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import TariffsByCategory from './tariffs_by_category';
import AccountsByFlat from './account/accounts_by_flat';
import {connect} from 'react-redux';

const store = ConfigureStore();

class App extends React.Component{

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => ("Tariffs!")} />
          <Route path='/users/1' render={() => ("<AccountsByFlat flatId='4'/>")} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById('tariffs'));

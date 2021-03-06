import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import TariffsByCategory from './tariffs_by_category';
import AccountsByFlat from './account/accounts_by_flat';
import AccountShow from './account/account_show';
import UtilitiesByFlat from './utilities_by_flat';
import Home from "../components/Home";
import Categories from "../components/Categories";
import Flats from './flats';
import FlatForm from './flat_form';
import {connect} from 'react-redux';

const store = ConfigureStore();

class App extends React.Component{
  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={() => <Home userId={this.props.userId}/>} />
            <Route exact path="/flats/new" component={() => <FlatForm userId={this.props.userId}/>} />
            <Route exact path='/users/:userId' component={() => <Flats userId={this.props.userId} />} />
            <Route exact path='/categories' component={() => <Categories userId={this.props.userId} />} />
            <Route exact path='/tariffs' component={() => <TariffsByCategory userId={this.props.userId}/>} />
            <Route exact path='/flats/:flatId/accounts' component={AccountsByFlat} />
            <Route path='/flats/:flatId/utilities' component={UtilitiesByFlat} />
            <Route exact path='/flats/:flatId/accounts/:accountId' component={AccountShow} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default withRouter(connect(null)(App));

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('root');
  if(app){
    let userId = app.hasAttribute('userId') ? JSON.parse(app.getAttribute('userId')) : '';
    ReactDOM.render(<App userId={userId}/>, app);
  }
});

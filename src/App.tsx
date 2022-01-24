import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import {
  HomePage, SignInPage, RegisterPage, DetailPage,
  SearchPage, ShoppingCartPage, PlaceOrderPage
} from './pages';
import { useSelector } from './redux/hooks';
import { getShoppingCart } from './redux/shoppingCart/slice';

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) => {
    return isAuthenticated
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  }
  return <Route render={routeComponent} {...rest} />
}

function App() {

  const jwt = useSelector(s => s.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt)
      dispatch(getShoppingCart(jwt));
  }, [jwt,dispatch]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path="/search/:keywords?" component={SearchPage} />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCartPage} />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/placeOrder"
            component={PlaceOrderPage} />
          <Route render={() => <h1>Page Not Found!</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

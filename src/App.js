import React, { useState, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

const Base = React.lazy(() => import('./components/Base'));
const Toppings = lazy(() => import('./components/Toppings'));
const Order = lazy(() => import('./components/Order'));

function App() {
  const [pizza, setPizza] = useState({ base: '', toppings: [] });

  const addBase = (base) => {
    setPizza({ ...pizza, base });
  };

  const addTopping = (topping) => {
    let newToppings;
    if (!pizza.toppings.includes(topping)) {
      newToppings = [...pizza.toppings, topping];
    } else {
      newToppings = pizza.toppings.filter((item) => item !== topping);
    }
    setPizza({ ...pizza, toppings: newToppings });
  };

  return (
    <>
      <Header />
      <Switch>
        <Route path="/base">
          <Suspense fallback="loading...">
            <Base addBase={addBase} pizza={pizza} />
          </Suspense>
        </Route>
        <Route path="/toppings">
          <Suspense fallback="loading...">
            <Toppings addTopping={addTopping} pizza={pizza} />
          </Suspense>
        </Route>
        <Route path="/order">
          <Suspense fallback="loading...">
            <Order pizza={pizza} />
          </Suspense>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Provider from '../Provider';

import PeopleList from './PeopleList';
import FavouriteList from './FavouriteList';

const App = () => {

  return (
    <BrowserRouter>
      <Provider>
        <div className="wrapper">
          <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/favourite">Favourite heroes</Link>
          </nav>
          <Switch>
            <Route
              path="/"
              exact
              component={PeopleList}

            />
            <Route path="/favourite" exact component={FavouriteList} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
};


export default App;

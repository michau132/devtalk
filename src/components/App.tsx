import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import PeopleList from './PeopleList';
import FavouriteList from './FavouriteList';

import { IPerson } from '../models/person';
import { connect } from 'react-redux';
import { loadPeople } from '../actions';
import { IState } from '../models/state';

export interface IAppProps {
  state: {
    currentPage: number;
    isLoading: boolean;
  };
  loadPeople: (numberPage: number) => void;
}


class App extends Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);
    this.scrollHandler = this.scrollHandler.bind(this);
  }
  componentDidMount() {
    this.props.loadPeople(this.props.state.currentPage);

    window.addEventListener('scroll', this.scrollHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }
  scrollHandler() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!this.props.state.isLoading) {
        this.props.loadPeople(this.props.state.currentPage);
      }
    }
  }


  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
};
const mapStateToProps = (state: IState) => ({
  state: { ...state }
});

const mapDispatchToProps = (dispatch: any) => ({
  loadPeople: (page: number) => dispatch(loadPeople(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

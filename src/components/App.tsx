import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import PeopleList from './PeopleList';
import FavouriteList from './FavouriteList';

import { IPerson } from '../models/person';
import { IResponse } from '../models/response';

export interface IAppState {
  people: IPerson[];
  hasNext: boolean;
  currentPage: number;
  isLoading: boolean;
  hasError: boolean;
  favourite: IPerson[];
  reRender: boolean;
}


class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      people: [],
      hasNext: true,
      currentPage: 1,
      isLoading: false,
      hasError: false,
      favourite: [],
      reRender: false
    };
    this.scrollHandler = this.scrollHandler.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
  }
  componentDidMount() {
    this.loadPeople();
    window.addEventListener('scroll', this.scrollHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }
  scrollHandler() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      this.loadPeople();
    }
  }
  reRender(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //getting html node element
    console.log(e.currentTarget);
    this.setState({ reRender: !this.state.reRender });
  }
  loadPeople() {
    const { isLoading, hasNext, currentPage } = this.state;
    if (!isLoading && hasNext) {
      this.setState(({ isLoading: true }), () => {
        axios.get<IResponse>(`api/people/?page=${currentPage}`)
          .then(res => {
            this.setState(prevstate => ({
              people: [...prevstate.people, ...res.data.results],
              hasNext: !!res.data.next,
              currentPage: prevstate.currentPage + 1,
              isLoading: false,
              hasError: false,
            }));
          })
          .catch(() => {
            this.setState({
              isLoading: false,
              hasError: true
            });
          });

      });
    }

  }
  addFavourite(person: IPerson) {
    this.setState(prevstate => ({ favourite: [...prevstate.favourite, person] }));
  }
  removeFavourite(person: IPerson) {
    const favourite = this.state.favourite.filter(el => el.name !== person.name);
    this.setState({
      favourite
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/favourite">Favourite heroes</Link>
            <button className="btn" onClick={(e) => this.reRender(e)}>render</button>
          </nav>
          <Switch>
            <Route
              path="/"
              exact
              render={(historyProps) => (
                <PeopleList
                  {...historyProps}
                  {...this.state}
                  // people={this.state.people} 
                  // isLoading={this.state.isLoading} 
                  // hasError={this.state.hasError}
                  // hasNext={this.state.hasNext}
                  addFavourite={this.addFavourite}
                />)
              }
            />
            <Route path="/favourite" exact render={() => {
              return (
                <FavouriteList favourite={this.state.favourite} removeFavourite={this.removeFavourite} />
              );
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};


export default App;

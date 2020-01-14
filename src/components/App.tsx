import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Loader from './Loader';

import { IPerson } from '../models/person';
import { IResponse } from '../models/response';

export interface IAppState {
  people: IPerson[];
  hasNext: boolean;
  currentPage: number;
  isLoading: boolean;
  hasError: boolean;
  favourite: IPerson[];
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
      favourite: []
    };
    this.scrollHandler = this.scrollHandler.bind(this);
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
  loadPeople() {
    const { isLoading, hasNext, currentPage } = this.state;
    if(!isLoading && hasNext) {
      this.setState(({ isLoading: true }), () => {
        axios.get<IResponse>(`api/people/?page=${currentPage}`)
          .then(res => {
            this.setState(prevstate =>({
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
          </nav>
          <Switch>
            <Route path="/" exact render={() => {
              return (
                <div className="people-list">
                  <h2 className="people-list__title">People list:</h2>
                  {
                    this.state.people.map((person) => (
                      <div className="person" key={person.url}>
                        <div>
                          <h4 className="person__name">Name: {person.name}</h4>
                          <p className="person__gender">Gender: {person.gender}</p>
                        </div>
                        <button className="btn" onClick={() => this.addFavourite(person)}>Add</button>
                      </div>
                    ))
                  }
                  {this.state.isLoading && <Loader color="blue"/>}
                  {this.state.hasError && <div>Can not fetch more data</div>}
                  {!this.state.hasNext && <p>there are no more people</p>}
                </div>
              );
            }} />
            <Route path="/favourite" exact render={() => {
              return (
                <div className="favourite-list">
                  <h2 className="favourite-list__title">Favourite people</h2>
                  {
                    this.state.favourite.map((person) => (
                      <div className="person" key={person.url}>
                        <div>
                          <h4 className="person__name">Name: {person.name}</h4>
                          <p className="person__gender">Gender: {person.gender}</p>
                        </div>
                        <button className="btn" onClick={() => this.removeFavourite(person)}>Remove</button>
                      </div>
                    ))
                  }
                </div>
              );
            }}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};


export default App;

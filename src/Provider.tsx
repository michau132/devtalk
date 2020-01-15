import React, { Component } from 'react';
import { IPerson } from './models/person';
import { IResponse } from './models/response';
import axios from 'axios';


export interface IProvider {
  people: IPerson[];
  hasNext: boolean;
  currentPage: number;
  isLoading: boolean;
  hasError: boolean;
  favourite: IPerson[];
}
interface IContext extends IProvider {
  addFavourite: (person: IPerson) => void;
  removeFavourite: (person: IPerson) => void;
}
interface IProps {
  children: React.ReactNode;
}

const MyContext = React.createContext<IContext>({
  people: [],
  hasNext: true,
  currentPage: 1,
  isLoading: false,
  hasError: false,
  favourite: [],
  addFavourite() { },
  removeFavourite() { }
});

export default class Provider extends Component<IProps, IProvider> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      people: [],
      hasNext: true,
      currentPage: 1,
      isLoading: false,
      hasError: false,
      favourite: [],
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

  loadPeople() {
    const { isLoading, hasNext, currentPage } = this.state;
    if (!isLoading && hasNext) {
      this.setState(
        ({ isLoading: true }),
        () => {
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
    const { favourite, people, isLoading, hasError, hasNext, currentPage } = this.state;
    return (
      <MyContext.Provider
        value={{
          favourite,
          people,
          isLoading,
          hasError,
          hasNext,
          currentPage,
          addFavourite: this.addFavourite,
          removeFavourite: this.removeFavourite
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export const MyConsumer = MyContext.Consumer;

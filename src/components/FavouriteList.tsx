import React, { Component } from 'react';
import { IPerson } from '../models/person';
import Person from './Person';
interface IPropsFavouriteList {
  favourite: IPerson[];
  removeFavourite: ((person: IPerson) => void);
}

interface IStateFavouriteList {
  input: string;
  filteredPeople: IPerson[];
}

export default class FavouriteList extends Component<IPropsFavouriteList, IStateFavouriteList> {
  constructor(props: IPropsFavouriteList) {
    super(props);
    this.state = {
      input: '',
      filteredPeople: props.favourite
    };
  }

  onChange(val: string) {
    this.setState({
      input: val,
      filteredPeople: this.props.favourite.filter(el => el.name.includes(val))
    });
  }
  render() {
    return (
      <div className="favourite-list">
        <h2 className="favourite-list__title">Favourite people</h2>
        <input type="text" value={this.state.input} onChange={e => this.onChange(e.target.value)} />
        {
          this.state.filteredPeople.map((person) => (
            <Person person={person} onClick={this.props.removeFavourite} btnTitle={"Remove"} key={person.url} />
          ))
        }
      </div>
    );
  }
}

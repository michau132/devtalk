import React, { Component } from 'react';
import { IPerson } from '../models/person';
import Person from './Person';
interface IPropsFavouriteList {
  favourite: IPerson[];
  removeFavourite: ((person: IPerson) => void);
}

export default class FavouriteList extends Component<IPropsFavouriteList> {
  render() {
    return (
      <div className="favourite-list">
        <h2 className="favourite-list__title">Favourite people</h2>
        {
          this.props.favourite.map((person) => (
            <Person person={person} onClick={this.props.removeFavourite} key={person.url} />
          ))
        }
      </div>
    );
  }
}

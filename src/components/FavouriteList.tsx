import React, { Component } from 'react';
import { IPerson } from '../models/person';
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
            <div className="person" key={person.url}>
              <div>
                <h4 className="person__name">Name: {person.name}</h4>
                <p className="person__gender">Gender: {person.gender}</p>
              </div>
              <button className="btn" onClick={() => this.props.removeFavourite(person)}>Remove</button>
            </div>
          ))
        }
      </div>
    );
  }
}

import React, { Component } from 'react';
import Loader from './Loader';
import { IPerson } from '../models/person';
interface IListProps {
  people: IPerson[];
  addFavourite: ((person: IPerson) => void);
  isLoading: boolean;
  hasError: boolean;
  hasNext: boolean;
}

export default class FavouriteList extends Component<IListProps> {
  render() {
    return (
      <div>
        <div className="people-list">
          <h2 className="people-list__title">People list:</h2>
          {
            this.props.people.map((person) => (
              <div className="person" key={person.url}>
                <div>
                  <h4 className="person__name">Name: {person.name}</h4>
                  <p className="person__gender">Gender: {person.gender}</p>
                </div>
                <button className="btn" onClick={() => this.props.addFavourite(person)}>Add</button>
              </div>
            ))
          }
          {this.props.isLoading && <Loader color="blue" />}
          {this.props.hasError && <div>Can not fetch more data</div>}
          {!this.props.hasNext && <p>there are no more people</p>}
        </div>
      </div>
    );
  }
}

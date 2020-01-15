import React, { Component } from 'react';
import Person from './Person';
import { MyConsumer } from '../Provider';


interface IStateFavouriteList {
  input: string;
}

export default class FavouriteList extends Component<{}, IStateFavouriteList> {
  constructor(props: {}) {
    super(props);
    this.state = {
      input: '',
    };
  }

  onChange(val: string) {
    this.setState({
      input: val,
    });
  }
  render() {
    return (
      <MyConsumer>
        {
          ({ favourite, removeFavourite }) => (
            <div className="favourite-list">
              <h2 className="favourite-list__title">Favourite people</h2>
              <input type="text" value={this.state.input} onChange={e => this.onChange(e.target.value)} />
              {
                favourite
                  .filter(person => person.name.includes(this.state.input))
                  .map((person) => (
                    <Person person={person} onClick={removeFavourite} btnTitle={"Remove"} key={person.url} />
                  ))
              }
            </div>
          )
        }
      </MyConsumer>
    );
  }
}

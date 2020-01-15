import React, { Component } from 'react';
import { IPerson } from '../models/person';
import Person from './Person';
import { connect } from 'react-redux';

import { removeFavourite } from '../actions';
import { IState } from '../models/state';


interface IPropsFavouriteList {
  favourite: IPerson[];
  removeFavourite: ((person: IPerson) => void);
}

interface IStateFavouriteList {
  input: string;
}

class FavouriteList extends Component<IPropsFavouriteList, IStateFavouriteList> {
  constructor(props: IPropsFavouriteList) {
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
      <div className="favourite-list">
        <h2 className="favourite-list__title">Favourite people</h2>
        <input type="text" value={this.state.input} onChange={e => this.onChange(e.target.value)} />
        {
          this.props.favourite
            .filter(person => person.name.includes(this.state.input))
            .map((person) => (
              <Person person={person} onClick={this.props.removeFavourite} btnTitle={"Remove"} key={person.url} />
            ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  favourite: state.favourite
});

const mapDispatchToProps = (dispatch: any) => ({
  removeFavourite: (person: IPerson) => dispatch(removeFavourite(person))
});



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouriteList);

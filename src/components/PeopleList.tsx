import React, { Component } from 'react';
import Loader from './Loader';
import { IPerson } from '../models/person';
import Person from './Person';
import { addFavourite } from '../actions';
import { connect } from 'react-redux';
import { IState } from '../models/state';
interface IListProps {
  people: IPerson[];
  isLoading: boolean;
  hasError: boolean;
  hasNext: boolean;
  addFavourite: ((person: IPerson) => void);
}


class PeopleList extends Component<IListProps> {
  render() {

    return (
      <div>
        <div className="people-list">
          <h2 className="people-list__title">People list:</h2>
          {
            this.props.people.map((person) => (
              <Person person={person} onClick={this.props.addFavourite} btnTitle={"Add"} key={person.url} />
            ))
          }
          {this.props.isLoading && <Loader color="blue" />}
          {this.props.hasError && <div>Can not fetch more data</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  ...state
});

const mapDispatchToProps = (dispatch: any) => ({
  addFavourite: (person: IPerson) => dispatch(addFavourite(person))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps)(PeopleList);

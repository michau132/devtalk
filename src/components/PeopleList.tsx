import React, { Component, FC } from 'react';
import Loader from './Loader';
import { MyConsumer } from '../Provider';
import Person from './Person';


const FavouriteList: FC<{}> = () => {

  return (
    <MyConsumer>
      {
        ({ people, isLoading, hasError, hasNext, addFavourite }) => {
          return (
            <div>
              <div className="people-list">
                <h2 className="people-list__title">People list:</h2>
                {people.map((person) => (
                  <Person person={person} onClick={addFavourite} btnTitle={"Add"} key={person.url} />
                ))
                }
                {isLoading && <Loader color="blue" />}
                {hasError && <div>Can not fetch more data</div>}
                {!hasNext && <p>there are no more people</p>}
              </div>
            </div>
          );
        }
      }
    </MyConsumer>
  );
};

export default FavouriteList;

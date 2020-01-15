import React, { FC } from 'react';
import { IPerson } from '../models/person';
interface IPropsPerson {
  person: IPerson;
  onClick: ((person: IPerson) => void);
}

const Person: FC<IPropsPerson> = ({ person, onClick }) => {
  return (
    <div className="person" key={person.url}>
      <div>
        <h4 className="person__name">Name: {person.name}</h4>
        <p className="person__gender">Gender: {person.gender}</p>
      </div>
      <button className="btn" onClick={() => onClick(person)}>Add</button>
    </div>
  );
};

export default Person;

import React, { FC } from 'react';
import { IPerson } from '../models/person';
interface IPropsPerson {
  person: IPerson;
  onClick: ((person: IPerson) => void);
  btnTitle: string;
}

const Person: FC<IPropsPerson> = ({ person, onClick, btnTitle }) => {
  return (
    <div className="person" key={person.url}>
      <div>
        <h4 className="person__name">Name: {person.name}</h4>
        <p className="person__gender">Gender: {person.gender}</p>
      </div>
      <button className="btn" onClick={() => onClick(person)}>{btnTitle}</button>
    </div>
  );
};

export default Person;

import { IPerson } from "../models/person";
import axios from 'axios';

export const addFavourite = (person: IPerson) => ({
  type: 'ADD_FAVOURITE',
  payload: person
});

export const removeFavourite = (person: IPerson) => ({
  type: 'REMOVE_FAVOURITE',
  payload: person
});

export const startLoading = () => ({
  type: 'START_LOADING'
});

export const endLoading = () => ({
  type: 'END_LOADING'
});
export const peopleResponse = (people) => ({
  type: 'PEOPLE_RESPONSE',
  payload: people
});
export const hasError = (status) => ({
  type: 'HAS_ERROR',
  payload: status
});

export const loadPeople = (page) => {
  return dispatch => {
    dispatch(startLoading());
    axios.get(`api/people/?page=${page}`)
      .then((res) => {
        dispatch(endLoading());
        dispatch(hasError(false));
        dispatch(peopleResponse(res.data.results));
      })
      .catch(() => {
        dispatch(hasError(true));
        dispatch(endLoading());
      });
  };
};

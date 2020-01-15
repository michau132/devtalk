import { IState } from "../models/state";

const initialState: IState = {
  favourite: [],
  isLoading: false,
  hasError: false,
  people: [],
  currentPage: 1
};
export default function people(state = initialState, action: any) {
  switch (action.type) {
    case 'ADD_FAVOURITE': {
      return {
        ...state,
        favourite: [...state.favourite, action.payload]
      };
    }
    case 'REMOVE_FAVOURITE': {
      const favourite = state.favourite.filter(el => el.name !== action.payload.name);
      return {
        ...state,
        favourite
      };
    }
    case 'START_LOADING': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'END_LOADING': {
      return {
        ...state,
        isLoading: false
      };
    }
    case 'HAS_ERROR': {
      return {
        ...state,
        hasError: action.payload
      };
    }
    case 'PEOPLE_RESPONSE': {
      return {
        ...state,
        people: [...state.people, ...action.payload],
        currentPage: state.currentPage + 1
      };
    }
    default:
      return state;
  }
}

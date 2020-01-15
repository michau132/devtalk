import { IPerson } from "./person";

export interface IState {
  favourite: IPerson[];
  isLoading: boolean;
  hasError: boolean;
  people: IPerson[];
  currentPage: number;
}

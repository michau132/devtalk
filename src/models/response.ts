import { IPerson } from './person';
export interface IResponse {
  count: number;
  next?: string;
  previous?: string;
  results: IPerson[];
}
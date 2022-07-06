import { Status } from './status';

export interface APIResponse<T> {
  status: Status;
  message?: string;
  itemsCount?: number;
  data?: T;
}

export interface GridModel<T> {
  paging: {
    limit?: number;
    offset?: number;
    total: number;
  };
  results: Array<T>;
}
export interface GridModelAlert<T> {
  paging: {
    limit: number;
    offset: number;
    total: number;
    unread: number;
  };
  results: Array<T>;
}
export interface GridEventsModel<T> {
  paging: {
    limit?: number;
    offset?: number;
    total: number;
  };
  results: Array<T>;
  activities: Array<T>;
  periodic_events: Array<T>;
}

export const FETCH_POLLSTERS = 'FETCH_POLLSTERS';
export const POLLSTERS_FETCHED = 'POLLSTERS_FETCHED';

export const fetchPollsters = stateId => ({type: FETCH_POLLSTERS, stateId});
export const pollstersFetched = pollsters => ({type: POLLSTERS_FETCHED, pollsters});

export const FETCH_POLLSTER = 'FETCH_POLLSTER';
export const POLLSTER_FETCHED = 'POLLSTER_FETCHED';

export const fetchPollster = id => ({type: FETCH_POLLSTER, id});
export const pollsterFetched = pollster => ({type: POLLSTER_FETCHED, pollster});

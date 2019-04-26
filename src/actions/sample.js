export const SAMPLE_FETCH_REQUESTED = 'SAMPLE_FETCH_REQUESTED';
export const SAMPLE_FETCH_SUCCEEDED = 'SAMPLE_FETCH_SUCCEEDED';

export const requestSample = skip => ({type: SAMPLE_FETCH_REQUESTED, skip});
export const receiveSample = (sample, size, total) => ({
    type: SAMPLE_FETCH_SUCCEEDED, sample, size, total
});

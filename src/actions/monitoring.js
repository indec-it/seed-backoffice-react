/* eslint max-len: off */
export const FETCH_GENERAL_MONITORING = 'REQUEST_GENERAL_MONITORING';
export const GENERAL_MONITORING_FETCHED = 'GENERAL_MONITORING_FETCHED';

export const fetchGeneralMonitoring = () => ({type: FETCH_GENERAL_MONITORING});
export const generalMonitoringFetched = generalMonitoring => ({type: GENERAL_MONITORING_FETCHED, generalMonitoring});

export const FETCH_RESPONSE_MONITORING = 'FETCH_RESPONSE_MONITORING';
export const RESPONSE_MONITORING_FETCHED = 'RESPONSE_MONITORING_FETCHED';

export const fetchResponseMonitoring = filters => ({type: FETCH_RESPONSE_MONITORING, filters});
export const responseMonitoringFetched = responseMonitoring => ({type: RESPONSE_MONITORING_FETCHED, responseMonitoring});

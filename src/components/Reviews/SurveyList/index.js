/* global URLSearchParams */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {forEach, delay, pickBy, isEmpty, fromPairs, size} from 'lodash';

import LoadingButton from '../../common/LoadingButton';
import SearchParams from './SearchParams';
import ListView from './ListView';
import {fetchSurveys, fetchStates, fetchStateInfo, setReviewFilters, clearSurveys} from '../../../actions/review';

const setQueryParams = searchParams => {
    const urlParams = new URLSearchParams();
    forEach(pickBy(searchParams), (value, key) => urlParams.append(key, value));
    return urlParams.toString();
};

const convertQueryParams = search => {
    const urlParams = new URLSearchParams(search);
    return fromPairs(Array.from(urlParams.entries()));
};

class SurveyList extends Component {
    static propTypes = {
        fetchSurveys: PropTypes.func.isRequired,
        reviewLoading: PropTypes.bool.isRequired,
        surveysAddressList: PropTypes.arrayOf(PropTypes.shape()),
        fetchStates: PropTypes.func.isRequired,
        fetchStateInfo: PropTypes.func.isRequired,
        clearSurveys: PropTypes.func.isRequired,
        states: PropTypes.arrayOf(PropTypes.shape()),
        location: PropTypes.shape({
            search: PropTypes.string
        }).isRequired,
        setReviewFilters: PropTypes.func.isRequired,
        stateInfo: PropTypes.arrayOf(PropTypes.shape({})),
        usersList: PropTypes.arrayOf(PropTypes.shape()),
        searchParams: PropTypes.shape({}).isRequired,
        surveysSize: PropTypes.number.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        states: null,
        stateInfo: null,
        usersList: null,
        surveysAddressList: null
    };

    constructor(props) {
        super(props);
        this.state = {
            searchParams: {
                stateId: '',
                ups: '',
                area: '',
                status: '',
                user: ''
            }
        };
    }

    componentDidMount() {
        this.props.fetchStates();
        const {searchParams} = this.props;
        const {search} = this.props.location;
        if (search) {
            const params = convertQueryParams(search);
            this.props.fetchStateInfo(params.stateId);
            this.handleParams(params);
            if (params.ups) {
                delay(() => this.fetchFilteredInfo(), 1);
            }
        } else if (!isEmpty(searchParams)) {
            this.handleParams(searchParams);
            if (searchParams.ups) {
                delay(() => this.fetchFilteredInfo(), 1);
            }
        }
    }

    handleFetchMore() {
        const {search} = this.props.location;
        const params = convertQueryParams(search);
        this.props.fetchSurveys(params, size(this.props.surveysAddressList));
    }

    handleParams(searchParams) {
        this.props.clearSurveys();
        this.setState(
            state => ({searchParams: Object.assign(state.searchParams, searchParams)}),
            () => this.props.history.push(`?${setQueryParams(this.state.searchParams)}`)
        );
    }

    fetchFilteredInfo(e) {
        this.props.clearSurveys();
        if (e) {
            e.preventDefault();
        }
        const {search} = this.props.location;
        const params = convertQueryParams(search);
        this.props.setReviewFilters(params);
        this.props.fetchSurveys(params);
    }

    render() {
        const {searchParams} = this.state;
        const {
            reviewLoading, surveysAddressList, states, stateInfo, usersList, surveysSize
        } = this.props;

        return (
            <Grid>
                <Row>
                    <Col sm={12}>
                        <h2>
                            <FontAwesome name="object-group"/> Revisión de Encuestas
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <SearchParams
                            onChange={obj => this.handleParams(obj)}
                            searchParams={searchParams}
                            onSearch={e => this.fetchFilteredInfo(e)}
                            states={states}
                            stateInfo={stateInfo}
                            usersList={usersList}
                            fetchStateInfo={e => this.props.fetchStateInfo(e)}
                        />
                    </Col>
                </Row>
                <div className="review-list">
                    {surveysAddressList &&
                        <ListView
                            surveysAddressList={surveysAddressList}
                            onClickFetchMore={() => this.handleFetchMore()}
                            surveysSize={surveysSize}
                            reviewLoading={reviewLoading}
                        />
                    }
                </div>
                {reviewLoading &&
                <Row>
                    <Col sm={12} className="text-center">
                        <LoadingButton label="Cargando..."/>
                    </Col>
                </Row>}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        reviewLoading: state.review.loading,
        surveysAddressList: state.review.surveysAddressList,
        surveysSize: state.review.surveysSize,
        states: state.review.states,
        stateInfo: state.review.stateInfo,
        usersList: state.review.usersList,
        searchParams: state.review.searchParams
    }),
    dispatch => ({
        fetchSurveys: (searchParams, skip) => dispatch(fetchSurveys(searchParams, skip)),
        fetchStates: () => dispatch(fetchStates()),
        fetchStateInfo: stateId => dispatch(fetchStateInfo(stateId)),
        setReviewFilters: searchParams => dispatch(setReviewFilters(searchParams)),
        clearSurveys: () => dispatch(clearSurveys())
    })
)(SurveyList);

export const ADD_REPOSITORY = 'ADD_REPOSITORY';
export const addRepository = repository => ({
    type: ADD_REPOSITORY,
    repository
});

export const RATE_REPOSITORY = 'RATE_REPOSITORY';
export const rateRepository = (repository, rating) => ({
    type: RATE_REPOSITORY,
    repository,
    rating
});

export const FETCH_DESCRIPTION_SUCCESS = 'FETCH_DESCRIPTION_SUCCESS';
export const fetchDescriptionSuccess = (repository, description) => ({
    type: FETCH_DESCRIPTION_SUCCESS,
    repository,
    description
});

export const FETCH_DESCRIPTION_ERROR= 'FETCH_DESCRIPTION_ERROR';
export const fetchDescriptionError = (repository, error) => ({
    type: FETCH_DESCRIPTION_ERROR,
    repository,
    error
});

import 'isomorphic-fetch';

export const fetchDescription = repository => dispatch => {
    const url = `https://api.github.com/repos/${repository}`;
    return fetch(url).then(response => {
        if (!response.ok) {
            const error = new Error(response.statusText)
            error.response = response
            throw error;
        }
        return response;
    })
    .then(response => response.json())
    .then(data =>
        dispatch(fetchDescriptionSuccess(repository, data.description))
    )
    .catch(error =>
        dispatch(fetchDescriptionError(repository, error))
    );
};

import React from 'react';
import {connect} from 'react-redux';

import StarRater from './star-rater';

import * as actions from '../actions/index';

export class Repository extends React.Component {
    constructor(props) {
        super(props);
        this.changeRating = this.changeRating.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(
            actions.fetchDescription(this.props.repository.name)
        );
    }

    changeRating(rating) {
        this.props.dispatch(
            actions.rateRepository(this.props.repository.name, rating)
        );
    }

    render() {
        return (
            <div className="repository">
                {this.props.repository.name} - {this.props.repository.description}
                &nbsp;
                <StarRater rating={this.props.repository.rating}
                           onChange={this.changeRating} />
            </div>
        );
    }
}

export default connect()(Repository);
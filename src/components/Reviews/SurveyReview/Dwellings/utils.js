import React, {Fragment} from 'react';
import {find, isNil, lang, some, includes, isArray, every} from 'lodash';
import FontAwesome from 'react-fontawesome';
import {operators, types} from '../../../../constants';

import {randomString} from '../../../../services/utils';

export default class ReviewsUtilities {
    static canShowQuestion(parent, chapter) {
        switch (parent.type) {
            case operators.EXISTS:
                return !isNil(chapter[parent.id]) === parent.value;
            case operators.NOT_EQUALS:
                return !lang.eq(chapter[parent.id], parent.value);
            default:
                return lang[parent.type](chapter[parent.id], parent.value);
        }
    }

    static canDrawQuestion(question, chapter) {
        if (!question.parents) {
            return true;
        }

        return some(
            question.parents,
            parent => {
                if (isArray(parent)) {
                    return every(parent, p => ReviewsUtilities.canShowQuestion(p, chapter));
                }
                return ReviewsUtilities.canShowQuestion(parent, chapter);
            }
        );
    }

    static getOption(options, value) {
        if (!value) {
            return null;
        }
        return find(options, o => parseInt(o.value, 10) === value);
    }

    static convertBooleanToString(value) {
        if (value) {
            return 'Si';
        } else if (value === false) {
            return 'No';
        }
        return null;
    }

    static parseQuestion(question, chapter) {
        if (question.type === types.RADIO_TABLE) {
            return (
                <Fragment>
                    <br/>
                    {question.questions.map(option => {
                        const questionValue = this.getOption(
                            question.options, chapter[`${question.name}${option.name}`]
                        );
                        return questionValue && (
                            <span key={randomString()}>
                                &nbsp;&nbsp;{option.text}&nbsp;
                                {questionValue.text} ({questionValue.value})<br/>
                            </span>);
                    })}
                </Fragment>
            );
        }
        if (question.type === types.MULTI_SELECT) {
            return (
                <Fragment>
                    <br/>
                    {question.options.map(option => includes(chapter[question.name], option.value) && (
                        <span key={randomString()}>
                            &nbsp;&nbsp;{option.label} ({option.value}) <FontAwesome name="check-circle"/><br/>
                        </span>)
                    )}
                </Fragment>
            );
        }

        if (question.options) {
            const q = this.getOption(question.options, chapter[question.name]);
            return q ? `${q.label} (${q.value})` : null;
        }
        if (question.type === types.CHECKBOX) {
            if (chapter[question.name]) {
                return (<FontAwesome name="check-circle"/>);
            }

            return null;
        }
        if (question.trueValue) {
            return this.convertBooleanToString(chapter[question.name]);
        }
        return question.name && chapter[question.name];
    }
}

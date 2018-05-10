import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Panel, PanelGroup} from 'react-bootstrap';
import {isEmpty} from 'lodash';
import FontAwesome from 'react-fontawesome';

import Geographic from './Geographic';
import Response from './Response';
import Visits from './Visits';
import Households from './Households';

const ParserDwelling = ({surveyAddress}) => {
    const geographic = Object.assign({}, surveyAddress) || {};
    delete geographic.dwellings;
    return (
        <Grid fluid>
            <Geographic geographic={geographic}/>
            {!isEmpty(surveyAddress.dwellings) &&
            <PanelGroup accordion id="surveyAddress" defaultActiveKey="dwelling1">
                {surveyAddress.dwellings.map(dwelling => (
                    <Panel eventKey={`dwelling${dwelling.order}`} key={`dwelling${dwelling.order}`}>
                        <Panel.Heading>
                            <Panel.Title toggle>
                                {dwelling.valid && <FontAwesome name="check-circle-o" className="text-success"/>}
                                {!dwelling.valid && <FontAwesome name="close" className="text-danger"/>}
                                <strong> Vivienda Nro. {dwelling.order}</strong>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Response
                                dwellingResponse={
                                    {
                                        response: dwelling.response,
                                        responseCause: dwelling.responseCause,
                                        noResponseReason: dwelling.noResponseReason
                                    }
                                }
                                dwellingOrder={dwelling.order}
                            />
                            {dwelling.response === 1 &&
                                <Households households={dwelling.households} dwellingOrder={dwelling.order}/>}
                            <Visits
                                dwellingOrder={dwelling.order}
                                visits={dwelling.visits}
                                label=" a la vivienda"
                                review
                            />
                        </Panel.Body>
                    </Panel>
                ))}
            </PanelGroup>}
            {isEmpty(surveyAddress.dwellings) && <h3 className="text-center">Sin datos para mostrar</h3>}
        </Grid>
    );
};

ParserDwelling.propTypes = {
    surveyAddress: PropTypes.shape().isRequired
};

export default ParserDwelling;

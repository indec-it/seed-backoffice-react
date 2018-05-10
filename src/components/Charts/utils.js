import {map} from 'lodash';
import {ChartColours} from '../common';

const generalChart = general => {
    const data = [
        general.total,
        general.unassigned,
        general.assigned,
        general.inProgress,
        general.resolved,
        general.closed
    ];

    return {
        labels: ['Total', 'Sin Asignar', 'Asignadas', 'En Campo', 'Cerradas', 'Aprobadas'],
        datasets: [{
            label: general._id.stateName,
            backgroundColor: 'rgba(0, 68, 255, 0.2)',
            borderColor: 'rgba(0, 68, 255, 1)',
            borderWidth: 1,
            data,
            ...ChartColours(general._id.stateId)
        }]
    };
};

const pollstersChart = pollster => {
    const data = [
        pollster.total,
        pollster.assigned,
        pollster.inProgress,
        pollster.closed,
        pollster.approved
    ];

    return {
        labels: ['Total', 'Asignadas', 'En Campo', 'Cerradas', 'Aprobadas'],
        datasets: [{
            label: pollster._id.pollsterName,
            backgroundColor: 'rgba(0, 68, 255, 0.2)',
            borderColor: 'rgba(0, 68, 255, 1)',
            borderWidth: 1,
            data,
            ...ChartColours(pollster._id.stateId)
        }]
    };
};

const pollsterStackedBar = pollsters => map(pollsters, (pollster, i) => (
    {
        label: pollster._id,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        stack: i,
        data: [
            pollster.total,
            pollster.assigned,
            pollster.inProgress,
            pollster.closed,
            pollster.approved
        ]
    }
));

const dwellings = dwelling => {
    const data = [
        dwelling.onCourse,
        dwelling.total,
        dwelling.response,
        dwelling.noResponse,
        dwelling.firstCause,
        dwelling.secondCause,
        dwelling.thirdCause,
        dwelling.fourthCause,
        dwelling.fifthCause,
        dwelling.sixthCause,
        dwelling.seventhCause,
        dwelling.eigthCause
    ];

    const label = dwelling._id.ups ?
        `${dwelling._id.stateName} UPS: ${dwelling._id.ups} Viviendas` : `${dwelling._id.stateName} Viviendas`;
    return {
        labels: [
            'Total', 'Relevadas', 'Resp.', 'No Resp.',
            '1 DES', '2 DEM', '3 FDS', '4 ECR', '5 VUE', '6 LCV', '7 DNE', '8 AIN'
        ],
        datasets: [{
            label,
            backgroundColor: 'rgba(0, 68, 255, 0.2)',
            borderColor: 'rgba(0, 68, 255, 1)',
            borderWidth: 1,
            data,
            ...ChartColours(dwelling._id.stateId)
        }]
    };
};

const households = household => {
    const data = [
        household.householdTotal,
        household.householdResponse,
        household.householdNoResponse,
        household.householdFirstCause,
        household.householdSecondCause,
        household.householdThirdCause
    ];
    const label = household._id.ups ?
        `${household._id.stateName} UPS: ${household._id.ups} Hogares` : `${household._id.stateName} Hogares`;
    return {
        labels: [
            'Total', 'Resp.', 'No Resp.', '1 AUS', '2 REC', '3 OTRS'
        ],
        datasets: [{
            label,
            backgroundColor: 'rgba(0, 68, 255, 0.2)',
            borderColor: 'rgba(0, 68, 255, 1)',
            borderWidth: 1,
            data,
            ...ChartColours(household._id.stateId)
        }]
    };
};

const members = member => {
    const data = [
        member.membersTotal,
        member.membersResponse,
        member.membersNoResponse,
        member.membersFirstCause,
        member.membersSecondCause,
        member.membersThirdCause
    ];
    const label = member && member._id.ups ?
        `${member._id.stateName} UPS: ${member._id.ups} Miembros` : `${member._id.stateName} Miembros`;
    return {
        labels: [
            'Total', 'Resp.', 'No Resp.', '1 AUS', '2 REC', '3 OTRS'
        ],
        datasets: [{
            label,
            backgroundColor: 'rgba(0, 68, 255, 0.2)',
            borderColor: 'rgba(0, 68, 255, 1)',
            borderWidth: 1,
            data,
            ...ChartColours(member._id.stateId)
        }]
    };
};

export {generalChart};
export {dwellings};
export {households};
export {members};
export {pollstersChart};
export {pollsterStackedBar};

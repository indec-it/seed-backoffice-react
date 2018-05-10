import {includes} from 'lodash';
import {roles} from '../../constants';

export const fullRole = profile => {
    if (includes(profile.roles, roles.SUB_COORDINATOR)) {
        return 'subCoordinator';
    } else if (includes(profile.roles, roles.COORDINATOR)) {
        return 'coordinator';
    } else if (includes(profile.roles, roles.SUPERVISOR)) {
        return 'supervisor';
    }
    return null;
};

export const getRoleName = user => {
    if (includes(user.roles, roles.NATIONAL_COORDINATOR)) {
        return 'Coordinador Nacional';
    } else if (includes(user.roles, roles.NATIONAL_COORDINATOR_RO)) {
        return 'Coordinador Nacional (SL)';
    } else if (includes(user.roles, roles.COORDINATOR)) {
        return 'Coordinador Provincial';
    } else if (includes(user.roles, roles.SUB_COORDINATOR)) {
        return 'Subcoordinador Provincial';
    } else if (includes(user.roles, roles.SUPERVISOR)) {
        return 'Jefe de Equipo';
    } else if (includes(user.roles, roles.RAE)) {
        return 'Responsable Agenda de Entrevistas';
    }
    return 'Encuestador';
};

export const directRole = user => {
    if (user && includes(user.roles, roles.NATIONAL_COORDINATOR)) {
        return roles.NATIONAL_COORDINATOR;
    } else if (user && includes(user.roles, roles.NATIONAL_COORDINATOR_RO)) {
        return roles.NATIONAL_COORDINATOR_RO;
    } else if (user && includes(user.roles, roles.COORDINATOR)) {
        return roles.COORDINATOR;
    } else if (user && includes(user.roles, roles.SUB_COORDINATOR)) {
        return roles.SUB_COORDINATOR;
    } else if (user && includes(user.roles, roles.SUPERVISOR)) {
        return roles.SUPERVISOR;
    }
    return roles.POLLSTER;
};

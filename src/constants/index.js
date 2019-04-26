const roles = {
    ADMIN: 'admin',
    USER: 'user',
    CUSTOMER: 'customer'
};

const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];


const sampleColumns = [
    {
        text: 'Nombre',
        label: 'name'
    },
    {
        text: 'Dirección',
        label: 'address'
    },
    {
        text: 'Radio',
        label: 'radio'
    },
    {
        text: 'Area',
        label: 'area'
    },
    {
        text: 'Segment',
        label: 'segment'
    },
    {
        text: 'Otra información',
        label: 'otherInfo'
    },
    {
        draw: true,
        detail: true,
        noInfo: true,
        label: 'name'
    },
    {
        draw: true,
        detail: true,
        noInfo: true,
        label: 'address'
    },
    {
        draw: true,
        detail: true,
        noInfo: true,
        label: 'radio'
    },
    {
        draw: true,
        detail: true,
        noInfo: true,
        label: 'area'
    },
    {
        draw: true,
        detail: true,
        noInfo: true,
        label: 'segment'
    },
    {
        draw: true,
        noInfo: true,
        label: 'Editar',
        linkTo: '/#edit'
    },
    {
        draw: true,
        noInfo: true,
        deleteAction: true
    }
];

const alphanumericRegex = '[^a-zA-Z0-9ñÑ]+$';

const DEFAULT_PAGE_SIZE = 30;

const actionModal = {
    SAVE: 'save',
    DELETE: 'delete',
    EDIT: 'edit',
    NEW: 'new'
};

export {alphanumericRegex};
export {roles};
export {days};
export {months};
export {DEFAULT_PAGE_SIZE};
export {actionModal};
export {sampleColumns};

/* eslint max-len: 0 */
import React from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap';

const dwellingFirst = (
    <Popover id="dwellingFirst">
        <strong>Deshabitada (en venta, alquiler, problemas judiciales, etcétera)</strong>
    </Popover>
);

const dwellingSecond = (
    <Popover id="dwellingSecond">
        <strong>Demolida, en demolición</strong>
    </Popover>
);

const dwellingThirdth = (
    <Popover id="dwellingThirdth">
        <strong>Fin de semana o temporada</strong>
    </Popover>
);

const dwellingFourth = (
    <Popover id="dwellingFourth">
        <strong>En construcción o refacción</strong>
    </Popover>
);

const dwellingFifth = (
    <Popover id="dwellingFifth">
        <strong>Vivienda usada como establecimiento (oficina, depósito, consultorio, gimnasio, fábrica, jardín de infantes, vivienda colectiva, etcétera)</strong>
    </Popover>
);

const dwellingSixth = (
    <Popover id="dwellingSixth">
        <strong>Local o comercio sin vivienda</strong>
    </Popover>
);

const dwellingSeventh = (
    <Popover id="dwellingSeventh">
        <strong>Vivienda no identificada / Dirección no existente</strong>
    </Popover>
);

const dwellingEighth = (
    <Popover id="dwellingEighth">
        <strong>Área insegura</strong>
    </Popover>
);


const householdFirst = (
    <Popover id="householdFirst">
        <strong>Ausencia</strong>
    </Popover>
);

const householdSecond = (
    <Popover id="householdThird">
        <strong>Rechazo</strong>
    </Popover>
);

const householdThird = (
    <Popover id="householdFourth">
        <strong>Otras Causas</strong>
    </Popover>
);

const memberFirst = (
    <Popover id="memberFirst">
        <strong>Ausencia</strong>
    </Popover>
);

const memberSecond = (
    <Popover id="memberSecond">
        <strong>Rechazo</strong>
    </Popover>
);

const memberthirdth = (
    <Popover id="memberthirdth">
        <strong>Otras causas</strong>
    </Popover>
);

export default (
    <thead>
        <tr>
            <th colSpan="2" rowSpan="3">
                Jurisdicción
            </th>
            <th colSpan="12">
                Viviendas
            </th>
            <th colSpan="6">
                Hogares
            </th>
            <th colSpan="6">
                Personas
            </th>
        </tr>
        <tr>
            <th rowSpan="2">
                Total
            </th>
            <th rowSpan="2">
                Relevadas
            </th>
            <th rowSpan="2">
                R
            </th>
            <th rowSpan="2">
                NR
            </th>
            <th colSpan="8">
                Razón de NR
            </th>
            <th rowSpan="2">
                Total
            </th>
            <th rowSpan="2">
                R
            </th>
            <th rowSpan="2">
                NR
            </th>
            <th colSpan="3">
                Razón de NR
            </th>
            <th rowSpan="2">
                Total
            </th>
            <th rowSpan="2">
                R
            </th>
            <th rowSpan="2">
                NR
            </th>
            <th colSpan="3">
                Razón de NR
            </th>
        </tr>
        <tr>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={dwellingFirst}>
                    <span>1 DES</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={dwellingSecond}>
                    <span>2 DEM</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={dwellingThirdth}>
                    <span>3 FDS</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={dwellingFourth}>
                    <span>4 ECR</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={dwellingFifth}>
                    <span>5 VUE</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={dwellingSixth}>
                    <span>6 LCV</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={dwellingSeventh}>
                    <span>7 DNE</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={dwellingEighth}>
                    <span>8 AIN</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={householdFirst}>
                    <span>1 AUS</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={householdSecond}>
                    <span>2 REC</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={householdThird}>
                    <span>3 OTROS</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={memberFirst}>
                    <span>1 AUS</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={memberSecond}>
                    <span>2 REC</span>
                </OverlayTrigger>
            </th>
            <th>
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={memberthirdth}>
                    <span>3 OTRS</span>
                </OverlayTrigger>
            </th>
        </tr>
    </thead>
);

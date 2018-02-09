import {ConnectionPositionPair} from "@angular/cdk/overlay";

export enum Placement {
    TOP = 'top',
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM = 'bottom',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    LEFT = 'left',
    LEFT_TOP = 'left-top',
    LEFT_BOTTOM = 'left-bottom',
    RIGHT = 'right',
    RIGHT_TOP = 'right-top',
    RIGHT_BOTTOM = 'right-bottom'
}

const PLACEMENT_MAP: { [key: string]: any } = {
    'top': {
        offsetX: 0,
        offsetY: -8,
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
    },
    'top-left': {
        offsetX: 0,
        offsetY: -8,
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
    },
    'top-right': {
        offsetX: 0,
        offsetY: -8,
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom'
    },
    'right': {
        offsetX: 8,
        offsetY: 0,
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center'
    },
    'right-top': {
        offsetX: 8,
        offsetY: 0,
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top'
    },
    'right-bottom': {
        offsetX: 8,
        offsetY: 0,
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom'
    },
    'bottom': {
        offsetX: 0,
        offsetY: 8,
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
    },
    'bottom-left': {
        offsetX: 0,
        offsetY: 8,
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
    },
    'bottom-right': {
        offsetX: 0,
        offsetY: 8,
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
    },
    'left': {
        offsetX: -8,
        offsetY: 0,
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center'
    },
    'left-top': {
        offsetX: -8,
        offsetY: 0,
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top'
    },
    'left-bottom': {
        offsetX: -8,
        offsetY: 0,
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'bottom'
    }
};

export function getPositions(placement: Placement): ConnectionPositionPair {
    return PLACEMENT_MAP[placement];
}

export const BOTTOM_LEFT_POSITIONS = getPositions(Placement.BOTTOM_LEFT);
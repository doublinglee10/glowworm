import {ConnectionPositionPair} from "@angular/cdk/overlay";

export class Placement {
    static TOP = 'top';
    static TOP_LEFT = 'topLeft';
    static TOP_RIGHT = 'topRight';
    static BOTTOM = 'bottom';
    static BOTTOM_LEFT = 'bottomLeft';
    static BOTTOM_RIGHT = 'bottomRight';
    static LEFT = 'left';
    static LEFT_TOP = 'leftTop';
    static LEFT_BOTTOM = 'leftBottom';
    static RIGHT = 'right';
    static RIGHT_TOP = 'rightTop';
    static RIGHT_BOTTOM = 'rightBottom';
}

const POSITIONS_MAP = {
    top: new ConnectionPositionPair({
        originX: 'center',
        originY: 'top'
    }, {
        overlayX: 'center',
        overlayY: 'bottom'
    }, 0, 0),
    topLeft: new ConnectionPositionPair({
        originX: 'start',
        originY: 'top'
    }, {
        overlayX: 'start',
        overlayY: 'bottom'
    }, 0, 0),
    topRight: new ConnectionPositionPair({
        originX: 'end',
        originY: 'top'
    }, {
        overlayX: 'end',
        overlayY: 'bottom'
    }, 0, 0),
    right: new ConnectionPositionPair({
        originX: 'end',
        originY: 'center'
    }, {
        overlayX: 'start',
        overlayY: 'center'
    }, 0, 0),
    rightTop: new ConnectionPositionPair({
        originX: 'end',
        originY: 'top'
    }, {
        overlayX: 'start',
        overlayY: 'top'
    }, 0, 0),
    rightBottom: new ConnectionPositionPair({
        originX: 'end',
        originY: 'bottom'
    }, {
        overlayX: 'start',
        overlayY: 'bottom'
    }, 0, 0),
    bottom: new ConnectionPositionPair({
        originX: 'center',
        originY: 'bottom'
    }, {
        overlayX: 'center',
        overlayY: 'top'
    }, 0, 0),
    bottomLeft: new ConnectionPositionPair({
        originX: 'start',
        originY: 'bottom'
    }, {
        overlayX: 'start',
        overlayY: 'top'
    }, 0, 0),
    bottomRight: new ConnectionPositionPair({
        originX: 'end',
        originY: 'bottom'
    }, {
        overlayX: 'end',
        overlayY: 'top'
    }, 0, 0),
    left: new ConnectionPositionPair({
        originX: 'start',
        originY: 'center'
    }, {
        overlayX: 'end',
        overlayY: 'center'
    }, 0, 0),
    leftTop: new ConnectionPositionPair({
        originX: 'start',
        originY: 'top'
    }, {
        overlayX: 'end',
        overlayY: 'top'
    }, 0, 0),
    leftBottom: new ConnectionPositionPair({
        originX: 'start',
        originY: 'bottom'
    }, {
        overlayX: 'end',
        overlayY: 'bottom'
    }, 0, 0)
};

const POSITION_MAP_REVERSE = {
    'center_top_center_bottom': Placement.TOP,
    'start_top_start_bottom': Placement.TOP_LEFT,
    'end_top_end_bottom': Placement.TOP_RIGHT,
    'center_bottom_center_top': Placement.BOTTOM,
    'start_bottom_start_top': Placement.BOTTOM_LEFT,
    'end_bottom_end_top': Placement.BOTTOM_RIGHT,
    'start_center_end_center': Placement.LEFT,
    'start_top_end_top': Placement.LEFT_TOP,
    'start_bottom_end_bottom': Placement.LEFT_BOTTOM,
    'end_center_start_center': Placement.RIGHT,
    'end_top_start_top': Placement.RIGHT_TOP,
    'end_bottom_start_bottom': Placement.RIGHT_BOTTOM,
};

const BASE_PLACEMENT_MAP = {
    top: [
        POSITIONS_MAP.top,  //top
        POSITIONS_MAP.right, //right
        POSITIONS_MAP.bottom, //bottom
    ],
    topLeft: [
        POSITIONS_MAP.topLeft,  //topLeft
        POSITIONS_MAP.right, //right
        POSITIONS_MAP.bottom, //bottom
    ],
    topRight: [
        POSITIONS_MAP.topRight,  //topRight
        POSITIONS_MAP.right, //right
        POSITIONS_MAP.bottom, //bottom
    ],
    bottom: [
        POSITIONS_MAP.bottom, //bottom
        POSITIONS_MAP.right, //right
        POSITIONS_MAP.top,  //top
    ],
    bottomLeft: [
        POSITIONS_MAP.bottomLeft, //bottomLeft
        POSITIONS_MAP.right, //right
        POSITIONS_MAP.top,  //top
    ],
    bottomRight: [
        POSITIONS_MAP.bottomRight, //bottomRight
        POSITIONS_MAP.right, //right
        POSITIONS_MAP.top,  //top
    ],
    left: [
        POSITIONS_MAP.left, //left
        POSITIONS_MAP.bottom, //bottom
        POSITIONS_MAP.right,  //right
    ],
    leftTop: [
        POSITIONS_MAP.leftTop, //leftTop
        POSITIONS_MAP.bottom, //bottom
        POSITIONS_MAP.right,  //right
    ],
    leftBottom: [
        POSITIONS_MAP.leftBottom, //leftBottom
        POSITIONS_MAP.bottom, //bottom
        POSITIONS_MAP.right,  //right
    ],
    right: [
        POSITIONS_MAP.right,  //right
        POSITIONS_MAP.bottom, //bottom
        POSITIONS_MAP.left, //left
    ],
    rightTop: [
        POSITIONS_MAP.rightTop,  //rightTop
        POSITIONS_MAP.bottom, //bottom
        POSITIONS_MAP.left, //left
    ],
    rightBottom: [
        POSITIONS_MAP.rightBottom,  //rightBottom
        POSITIONS_MAP.bottom, //bottom
        POSITIONS_MAP.left, //left
    ]
};

export function getPositions(placement: string): ConnectionPositionPair[] {
    return BASE_PLACEMENT_MAP[placement];
}

export function getPlacement(position: ConnectionPositionPair): string {
    let key = [
        position.originX,
        position.originY,
        position.overlayX,
        position.overlayY
    ].join('_');
    return POSITION_MAP_REVERSE[key];
}
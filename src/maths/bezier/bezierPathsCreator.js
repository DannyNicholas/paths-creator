import { fromJS } from 'immutable'
import PathType from '../../constants/PathType'
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../../constants/DimensionDefault'
import createPoint from '../createPoint'
import createBezierControlPoints from './createBezierControlPoints'
import createBezierPath from './createBezierPath'
import {
    getStartPoint,
    getFinishPoint
} from '../facade/pathsCreator'
import { invertControlPoints } from '../../utils/invertControlPoints'

const pointOffset = 20
const DEFAULT_PATH_POINTS = 100
const defaultParameters = fromJS({pathPoints: DEFAULT_PATH_POINTS})

export const getBezierStartPoint = (controlPoints) => {
    return controlPoints.get('start').get('point')
}

export const getBezierFinishPoint = (controlPoints) => {
    return controlPoints.get('finish').get('point')
}

export const getBezierStartKey = () => {
    return 'start'
}

export const getBezierFinishKey = () => {
    return 'finish'
}

export const createDefaultInitialBezierState = () => {
    return createInitialBezierState(DEFAULT_WIDTH, DEFAULT_HEIGHT, defaultParameters)
}

export const createInitialBezierState = (width, height, parameters) => {
    const start = createPoint( pointOffset, height-pointOffset )
    const startControl = createPoint( pointOffset, pointOffset )
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return fromJS({
        paths: [
            createBezierPathDataHelper(controlPoints, parameters, true)
        ],
        width: width,
        height: height,
        animation: {
            animating: false,
            nextIndex: 1,
            position: start
        }
    })
}

// transform from another path type to bezier
export const transformToBezierPathData = (width, previousType, controlPoints, parameters) => {
    const start = getStartPoint(previousType, controlPoints)
    const finish = getFinishPoint(previousType, controlPoints)
    const startControl = createPoint( pointOffset, pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const bezierControlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    const pathPoints = parameters.get('pathPoints') || DEFAULT_PATH_POINTS
    const newParameters = parameters
        .set('pathPoints', pathPoints)
        .filter((parameter, key) => key === 'pathPoints')

    return createBezierPathDataHelper(bezierControlPoints, newParameters, true)
}

export const createDefaultBezierPathDataWithFixedStart = (width, height, parameters, start) => {
    const startControl = createPoint( pointOffset, pointOffset )
    const finish = createPoint( width-pointOffset, height-pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createBezierPathDataHelper(controlPoints, parameters, false)
}

export const createDefaultBezierPathDataWithFixedFinish = (width, height, parameters, finish) => {    
    const start = createPoint( pointOffset, height-pointOffset )
    const startControl = createPoint( pointOffset, pointOffset )
    const finishControl = createPoint( width-pointOffset, pointOffset )
    const controlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    return createBezierPathDataHelper(controlPoints, parameters, false)
}

export const importBezierPathData = (data, width, height) => {
    const start = createPoint( data.start.x, data.start.y )
    const startControl = createPoint( data.startControl.x, data.startControl.y )
    const finish = createPoint( data.finish.x, data.finish.y )
    const finishControl = createPoint( data.finishControl.x, data.finishControl.y )
    const controlPoints = createBezierControlPoints(
        start,
        startControl,
        finish,
        finishControl
    )
    const parameters = fromJS({pathPoints: data.pathPoints})

    // invert all control points in y-axis to match expected export co-ordinates
    const invertedControlPoints = invertControlPoints(controlPoints, height)

    return createBezierPathDataHelper(invertedControlPoints, parameters, false)
}

// create path data from supplied control points and path points
const createBezierPathDataHelper = (controlPoints, parameters, active) => {
    const path = createBezierPath( controlPoints, parameters )
    return fromJS(
        {
            type: PathType.BEZIER,
            path: path,
            controlPoints: controlPoints,
            parameters: parameters,
            active: active
        }
    )
}
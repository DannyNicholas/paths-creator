import PathType from '../../constants/PathType'
import createBezierPath from '../bezier/createBezierPath'
import {
    getBezierStartPoint,
    getBezierFinishPoint,
    getBezierStartKey,
    getBezierFinishKey,
    createDefaultInitialBezierState,
    createDefaultBezierPathDataWithFixedStart,
    createDefaultBezierPathDataWithFixedFinish,
    transformToBezierPathData
} from '../bezier/bezierPathsCreator'
import createLinearPath from '../linear/createLinearPath'
import {
    getLinearStartPoint,
    getLinearFinishPoint,
    getLinearStartKey,
    getLinearFinishKey,
    createDefaultLinearPathDataWithFixedStart,
    createDefaultLinearPathDataWithFixedFinish,
    transformToLinearPathData
} from '../linear/linearPathsCreator'
import createPausePath from '../pause/createPausePath'
import {
    getPauseStartPoint,
    getPauseFinishPoint,
    getPauseStartKey,
    getPauseFinishKey,
    createDefaultPausePathDataWithFixedStart,
    createDefaultPausePathDataWithFixedFinish,
    transformToPausePathData
} from '../pause/pausePathsCreator'

const bezier = {
    createDefaultInitialState: (width, height, pathPoints) => createDefaultInitialBezierState(width, height, pathPoints),
    createDefaultPathDataWithFixedStart: (width, height, pathPoints, start) => createDefaultBezierPathDataWithFixedStart(width, height, pathPoints, start),
    createDefaultPathDataWithFixedFinish: (width, height, pathPoints, finish) => createDefaultBezierPathDataWithFixedFinish(width, height, pathPoints, finish),
    createPath: (controlPoints, parameters) => createBezierPath(controlPoints, parameters),
    transformPathData: (width, controlPoints, parameters) => transformToBezierPathData(width, controlPoints, parameters),
    getStartKey: () => getBezierStartKey(),
    getFinishKey: () => getBezierFinishKey(),
    getStartPoint: (controlPoints) => getBezierStartPoint(controlPoints),
    getFinishPoint: (controlPoints) => getBezierFinishPoint(controlPoints)
}

const linear = {
    createDefaultPathDataWithFixedStart: (width, height, pathPoints, start) => createDefaultLinearPathDataWithFixedStart(width, height, pathPoints, start),
    createDefaultPathDataWithFixedFinish: (width, height, pathPoints, finish) => createDefaultLinearPathDataWithFixedFinish(width, height, pathPoints, finish),
    createPath: (controlPoints, parameters) => createLinearPath(controlPoints, parameters),
    transformPathData: (controlPoints, parameters) => transformToLinearPathData(controlPoints, parameters),
    getStartKey: () => getLinearStartKey(),
    getFinishKey: () => getLinearFinishKey(),
    getStartPoint: (controlPoints) => getLinearStartPoint(controlPoints),
    getFinishPoint: (controlPoints) => getLinearFinishPoint(controlPoints)
}

const pause = {
    createDefaultPathDataWithFixedStart: (width, height, pathPoints, start) => createDefaultPausePathDataWithFixedStart(pathPoints, start),
    createDefaultPathDataWithFixedFinish: (width, height, pathPoints, finish) => createDefaultPausePathDataWithFixedFinish(pathPoints, finish),
    createPath: (controlPoints, parameters) => createPausePath(controlPoints, parameters),
    transformPathData: (controlPoints, parameters) => transformToPausePathData(controlPoints, parameters),
    getStartKey: () => getPauseStartKey(),
    getFinishKey: () => getPauseFinishKey(),
    getStartPoint: (controlPoints) => getPauseStartPoint(controlPoints),
    getFinishPoint: (controlPoints) => getPauseFinishPoint(controlPoints)
}

// create and return the initial default path data
// this is always a bezier path
export const createDefaultInitialState = (width, height, parameters) =>
    bezier.createDefaultInitialState(width, height, parameters)

// get starting point key (e.g. 'start' or 'position') for path data of the wanted type
export const getStartKey = (type) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.getStartKey()

        case PathType.LINEAR:
            return linear.getStartKey()

        case PathType.PAUSE:
            return pause.getStartKey()

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// get finishing point key (e.g. 'finish' or 'position') for path data of the wanted type
export const getFinishKey = (type) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.getFinishKey()

        case PathType.LINEAR:
            return linear.getFinishKey()

        case PathType.PAUSE:
            return pause.getFinishKey()

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// get starting point for path data of the wanted type
export const getStartPoint = (type, controlPoints) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.getStartPoint(controlPoints)

        case PathType.LINEAR:
            return linear.getStartPoint(controlPoints)

        case PathType.PAUSE:
            return pause.getStartPoint(controlPoints)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// get finish point for path data of the wanted type
export const getFinishPoint = (type, controlPoints) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.getFinishPoint(controlPoints)

        case PathType.LINEAR:
            return linear.getFinishPoint(controlPoints)

        case PathType.PAUSE:
            return pause.getFinishPoint(controlPoints)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// create and return path data of the wanted type
export const createPath = (type, controlPoints, parameters) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.createPath(controlPoints, parameters)

        case PathType.LINEAR:
            return linear.createPath(controlPoints, parameters)

        case PathType.PAUSE:
            return pause.createPath(controlPoints, parameters)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// create and return path data with fixed start point of the wanted type
export const createDefaultPathDataWithFixedStart = (type, width, height, parameters, start) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.createDefaultPathDataWithFixedStart(width, height, parameters, start)

        case PathType.LINEAR:
            return linear.createDefaultPathDataWithFixedStart(width, height, parameters, start)

        case PathType.PAUSE:
            return pause.createDefaultPathDataWithFixedStart(width, height, parameters, start)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// create and return path data with fixed finish point of the wanted type
export const createDefaultPathDataWithFixedFinish = (type, width, height, parameters, finish) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.createDefaultPathDataWithFixedFinish(width, height, parameters, finish)

        case PathType.LINEAR:
            return linear.createDefaultPathDataWithFixedFinish(width, height, parameters, finish)

        case PathType.PAUSE:
            return pause.createDefaultPathDataWithFixedFinish(width, height, parameters, finish)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

// create and return transformed path data to the wanted type
export const transformPathData = (type, width, height, controlPoints, parameters) => {

    switch (type) {
        case PathType.BEZIER:
            return bezier.transformPathData(width, controlPoints, parameters)

        case PathType.LINEAR:
            return linear.transformPathData(controlPoints, parameters)

        case PathType.PAUSE:
            return pause.transformPathData(controlPoints, parameters)

        default:
            console.error("Unrecognised path type '" + type + "'.")
            return null
    }
}

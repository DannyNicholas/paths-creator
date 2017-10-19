import React from 'react'
import PropTypes from 'prop-types'
import ControlPointEditor from './ControlPointEditor'

const BezierPointsEditor = ( {controlPoints, moveControlPoint} ) => {
    
    const Editors = controlPoints.valueSeq()
        .map((controlPoint, index) =>
            <ControlPointEditor
                key={index}
                type={controlPoint.get('name')}
                controlPoint={controlPoint.get('point')}
                handleChange={moveControlPoint}
            />
        )

    return(
        <div>
            {Editors}           
        </div>
    )
}

BezierPointsEditor.propTypes = {
    controlPoints: PropTypes.object.isRequired,
    moveControlPoint: PropTypes.func.isRequired,
}

export default BezierPointsEditor
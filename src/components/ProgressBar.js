import React from 'react';

const Filler = ({percentage}) => {
    return <div className='filler' style={{width: `${percentage}%`}}>{percentage}%</div>
}
export const ProgressBar = ({percentage}) => {
    return (
        <div className="progress-bar">
            <Filler percentage={percentage}/>
        </div>
    )
}
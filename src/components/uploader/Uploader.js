import React from 'react'

const Uploader = (props) => {
    return (
        <div className="fixed-bottom mb-2">
            <div class="progress">
                <div style={{ width: props.prog.progress + '%' }} class="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    {props.prog.progress}%
                </div>
            </div>
        </div>
    )
}

export default Uploader
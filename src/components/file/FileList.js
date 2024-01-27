import React from 'react'
import File from './File'
const FileList = (props) => {
    const { a, download, remove } = props
    const renderList = Object.keys(a).map(file => {
        return (
            <File url={a[file]} fileName={file} download={download} remove={remove} />
        )
    })
    return (
        <div className="d-flex flex-now">
            { renderList }
        </div>
    )
}
export default FileList
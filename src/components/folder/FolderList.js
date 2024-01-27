import React from 'react'
import Folder from './Folder'

const FolderList = (props) => {
    var { folders, openFolder, source, remove } = props
    const renderList = folders.map(folder => {
        return (
            <div>
                <Folder folder={folder} openFolder={openFolder} source={source} remove={remove} />
            </div>
        )
    })

    return (
        <div className="d-flex flex-row">
            {renderList}
        </div>
    )
}
export default FolderList
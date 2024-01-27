import React from 'react'
import FolderList from './FolderList'

const FolderView = (props) => {
    var { folders, openFolder, source, remove } = props

    const renderListArray = () => {
        var ele = []
        const numViews = Math.ceil(folders.length / 6)
        const flength = folders.length
        const lmax = 6
        for (let i = 0; i < numViews; i++) {
            var a = []
            for (let x = 0; x < ((flength - (lmax*i)) > lmax ? 6 : (flength - (lmax*i))); x++) {
                a.push(folders.pop())
            }
            ele.push(React.createElement(FolderList, { folders: a, openFolder: openFolder, source: source, remove: remove }))
        }
        return ele
    }

    const e = renderListArray()

    return (
        <div className="d-flex flex-column">
            {e}
        </div>
    )
}
export default FolderView
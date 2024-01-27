import React from 'react'
import FileList from './FileList'

const FileView = (props) => {
    var { files, download, remove } = props

    const renderFilesObjects = (f) => {
        const numViews = Math.ceil(f.length / 6)
        const flength = f.length
        const lmax = 6
        var ele = []
        let count = 0
        for (let i = 0; i < numViews; i++) {
            var a = {}
            for (let x=0; x < ((flength - (lmax*i)) > lmax ? 6 : (flength - (lmax*i))); x++) {
                let key = Object.keys(f[x])[0]
                a[key] = f[x][key]
            }
            count++
            let x = React.createElement(FileList, { a, download, remove })
            ele.push(x)
        }
        return ele
    }
    const objToArray = (files) => {
        var n = []
        for (let key in files) {
            let x = {
                [key]: files[key]
            }
            n.push(x)
        }
        return n
    }
    const f = objToArray(files)
    const m = renderFilesObjects(f)
    return (
        <div>
            {m}
        </div>
    ) 
}
export default FileView
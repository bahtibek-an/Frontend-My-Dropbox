import React from "react"
import './CenteredContainer.css'

export default function CenteredContainer({ children }) {
  return (
    <div className="centered-con">
      <div className="centered-con-item">
        {children}
      </div>
    </div>
  )
}

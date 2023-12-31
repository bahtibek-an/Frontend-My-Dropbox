import { useState, useEffect } from "react"

function Alert({ message, color }) {
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <div>
      {showAlert ? (
        <div className=" container d-flex flex-row-reverse">
          <div className={`alert alert-${color} alert-dismissible w-25 mt-3`}>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
            ></button>
            <strong>{message}</strong>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Alert

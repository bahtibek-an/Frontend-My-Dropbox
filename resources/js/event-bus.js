import mitt from "mitt"

export const FILE_UPLOAD_STARTED = 'FILE_UPLOAD_STARTED'
export const SHOW_ERROR_DIALOG = 'SHOW_ERROR_DIALOG'
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const DISPLAY_MODE = 'DISPLAY_MODE'

export const emitter = mitt()

export function showErrorDialog(message) {
    emitter.emit(SHOW_ERROR_DIALOG, {message})
}

export function showSuccessNotification(message) {
    emitter.emit(SHOW_NOTIFICATION, {type: 'success', message})
}

export function showErrorNotification(message) {
    emitter.emit(SHOW_NOTIFICATION, {type: 'error', message})
}

export function toggleDisplayMode(mode) {
    emitter.emit(DISPLAY_MODE, {type: 'mode', mode})
}

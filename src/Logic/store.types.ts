import { ReactNode } from "react"

export const SET_USER = 'SET_USER'
export const SIGN_OUT = 'SIGN_OUt'
export const START_LOADING = 'START_LOADING'
export const END_LOADING = 'END_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const NEED_VERIFICATION = 'NEED_VERIFICATION'
export const SET_SUCCESS = 'SET_SUCCESS'
export const SET_SUBMITTED = 'SET_SUBMITTED'
export const FETCH_BOARD = 'FETCH_BOARD'

// Page State
export interface PageState {
    loading: boolean
    error: string
    success: string
    submitted: boolean
}

// Page Actions
interface StartLoadingAction {
    type: typeof START_LOADING
}

interface EndLoadingAction {
    type: typeof END_LOADING
}

interface SetSuccessAction {
    type: typeof SET_SUCCESS
    payload: string
}

interface SetErrorAction {
    type: typeof SET_ERROR
    payload: string
}

interface setSubmittedAction {
    type: typeof SET_SUBMITTED
    payload: boolean
}

export type PageAction = StartLoadingAction | EndLoadingAction | SetErrorAction | SetSuccessAction | setSubmittedAction

// Auth Types
export interface User {
    name: ReactNode
    firstName: string
    email: string
    id: string
    createdAt: any
}

export interface AuthState {
    user: User | null
    authenticated: boolean
    needVerification: boolean
}

export interface SignUpData {
    name: any
    firstName: string
    email: string
    password: string
}

export interface SignInData {
    email: string
    password: string
}

// Auth Actions
interface SetUserAction {
    type: typeof SET_USER
    payload: User
}



interface SignOutAction {
    type: typeof SIGN_OUT
}

interface NeedVerificationAction {
    type: typeof NEED_VERIFICATION
}

export type AuthAction = SetUserAction | SignOutAction | SetErrorAction | NeedVerificationAction | SetSuccessAction;


export interface Board {
    title: string,
    content: string,
    author: string,
    createdAt: any
}

export interface BoardState{
    boardList: Board[] | null
    board: Board | null
}

export interface registerData{
    title: string,
    content: string,
}

// board actions
interface fetchBoardAction{
    type: typeof FETCH_BOARD
    payload: Board
}

export type BoardAction = fetchBoardAction

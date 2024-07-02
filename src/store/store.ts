import {atom} from 'jotai/vanilla'

export const userAtom = atom({username: ""});
export const connectToServerAtom = atom(false)
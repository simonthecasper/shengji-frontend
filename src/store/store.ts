import {atom} from 'jotai/vanilla'

export const userAtom = atom({username: ""});
export const isConnectedAtom = atom(false);
export const connectToServerAtom = atom(false)
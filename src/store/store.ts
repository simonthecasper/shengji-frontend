import { initSocketConnection } from "../global/socket";
import { atom } from 'jotai/vanilla'
import { GameTypes } from "../enums/GameTypes.ts";

export const userAtom = atom<string>(''); //{username: ""}
// export const inputAtom = atom('');
export const nameAndConnectServer = atom(
	() => '',
	(get, set, input: string) => {
		// const userName = get(userAtom)
		if (input.length == 0) {
			alert("Please enter a username.");
			return;
		} else if (input.length > 20) {
			alert("Please enter a shorter username");
			return;
		} else {
			set(userAtom, input)
		}
		console.log('username: ', get(userAtom));

		initSocketConnection();
	}
);
export const isConnectedAtom = atom(false);
export const connectToServerAtom = atom(false)

export const gamesAtom = atom([GameTypes.crazy_lvl, GameTypes.original, GameTypes.test2]);
// Atom to hold the selected game, initially null
export const selectedGameAtom = atom<null | string>(null)

export const listOfPlayersAtom = atom(['p1', 'p2', 'p3'])


import { initSocketConnection } from "../global/socket";
import { atom } from 'jotai/vanilla'

export const userAtom = atom(''); //{username: ""}
// export const inputAtom = atom('');
export const nameAndConnectServer = atom(
	() => '',
	(get, set, input:string) => {
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

export const gamesAtom = atom(['orginal', 'test2', 'crazy_lvl'])
export const selectedGameAtom = atom<string | null>(null, 
	(get, set, selectedGame:string) => {
		if(selectedGame in get(gamesAtom)){
			set(selectedGame)
		}
	}
)


import { disconnect, initSocketConnection } from "../socket/socket";
import { atom } from 'jotai/vanilla'
import { GameTypes } from "../enums/GameTypes.ts";
import { pageStateAtom } from "./pageStateAtom.ts";

export const userAtom = atom<string>('');
export const userPlayerIDAtom = atom<string>('');

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
			if (get(pageStateAtom) === "login") {
				set(pageStateAtom, "connect_session")
			}
		}
		console.log('username: ', get(userAtom));

		initSocketConnection();
	}
);



export const isInLobbyAtom = atom(false);

export const gamesAtom = atom([GameTypes.shengji]);

// Atom to hold the selected game, initially null
export const selectedGameAtom = atom("", // initial value
	(get, set, selectedGame: string) => {
		const games = get(gamesAtom);
		console.log('selectedGame: ', selectedGame);
		if (games.map(x => x.valueOf()).includes(selectedGame)) {
			set(selectedGameAtom, selectedGame);
		}
	}
);

export const listOfPlayersAtom = atom([" "]);

export const sessionIDAtom = atom(null);

export const isGameConfiguredAtom = atom(false);

export const playerAttributesAtom = atom(null);

export const hostPlayerIDAtom = atom(null);

// Resets relevant atom values and fully disconnects user from server
export const disconnectAtom = atom(
	() => '',
	(get, set) => {
		set(pageStateAtom, "login")
		set(userPlayerIDAtom, "")
		set(isInLobbyAtom, false)
		set(sessionIDAtom, null)
		set(isGameConfiguredAtom, false)
		set(playerAttributesAtom, null)
		set(hostPlayerIDAtom, null)
		disconnect()
	}
);



//Back and Next Buttons
export const backButtonTextAtom = atom("Placeholder");
export const backButtonActiveAtom = atom(true);
export const backButtonClickAtom = atom (
	() => '',
	(get, set) => {
		if (get(pageStateAtom) === "lobby") {
			set(disconnectAtom)
		}
	}
);

export const nextButtonTextAtom = atom("Placeholder");
export const nextButtonActiveAtom = atom(true);
export const nextButtonClickAtom = atom (
	() => '',
	(get, set) => {
		
	}
);
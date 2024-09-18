import { initSocketConnection } from "../socket/socket";
import { atom } from 'jotai/vanilla'
import { GameTypes } from "../enums/GameTypes.ts";

export const userAtom = atom<string>(''); //{username: ""}
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

export const pageStateAtom = atom("login");

export const isInLobbyAtom = atom(false);

export const gamesAtom = atom([GameTypes.shengji]);

// Atom to hold the selected game, initially null
export const selectedGameAtom = atom(null, // initial value
	(get, set, selectedGame: string) => {
		const games = get(gamesAtom);
		console.log('selectedGame: ', selectedGame);
		if (games.map(x => x.valueOf()).includes(selectedGame)) {
			set(selectedGameAtom, selectedGame);
		}
	}
);

export const listOfPlayersAtom = atom([" "]);

export const sessionIDAtom = atom("Unset");

export const isGameConfiguredAtom = atom(false);

export const playerAttributesAtom = atom(null);

export const hostPlayerIDAtom = atom("");

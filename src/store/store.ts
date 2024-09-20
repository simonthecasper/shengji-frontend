import { disconnect, initSocketConnection } from "../socket/socket";
import { atom } from 'jotai/vanilla'
import { GameTypes } from "../enums/GameTypes.ts";
import { pageStateAtom } from "./pageStateAtom.ts";
import NestedAnyObj from "../types/utility/NestedAnyObj.ts";
import { C2S_createGame } from "../socket/C2SMessages.ts";

import ButtonTypes from "../types/ButtonTypes.ts";

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

export const listOfPlayersAtom = atom([" "]);

export const isGameConfiguredAtom = atom(false);

// BaseGameLayer display atoms
export const sessionIDAtom = atom("");
export const playerCountAtom = atom(0);

export const playerAttributesAtom = atom(null as NestedAnyObj | null,
	(get, set, input: NestedAnyObj | null) => {
		set(playerAttributesAtom, input)
		set(playerCountAtom, Object.keys(get(playerAttributesAtom)).length)

		if (get(playerAttributesAtom) != null && get(hostPlayerIDAtom) != null)
			set(attributesAndHostSignalAtom, true)
		else
			set(attributesAndHostSignalAtom, false)
	}
);

export const hostPlayerIDAtom = atom("",
	(get, set, input:string) => {
		set(hostPlayerIDAtom, input)

		if (get(playerAttributesAtom) != null && get(hostPlayerIDAtom) != null)
			set(attributesAndHostSignalAtom, true)
		else
			set(attributesAndHostSignalAtom, false)
	}
);
export const attributesAndHostSignalAtom = atom(false); //Set to true once hostPlayerID and playerAttributes are both received


// Game Selection atoms
export const gamesDataAtom = atom(GameTypes)
export const gamesAtom = atom(Object.keys(GameTypes));
export const selectedGameAtom = atom("", // initial value
	(get, set, selectedGame: string) => {
		const games = get(gamesAtom);
		console.log('selectedGame: ', selectedGame);
		if (games.map(x => x.valueOf()).includes(selectedGame) || selectedGame === "") {
			set(selectedGameAtom, selectedGame);
		}

		//// Update button display text
		let player_count = get(playerCountAtom)
		// If player count is not correct
		if (get(gamesDataAtom)[get(selectedGameAtom)].players.find((element: number) => element === player_count) === undefined) {
			set(nextButtonTextAtom, "Player Count Incorrect")
			set(nextButtonActiveAtom, false)
			set(nextButtonStyleAtom, "inactive")
		} else {
			set(nextButtonTextAtom, "Configure Game")
			set(nextButtonActiveAtom, false)
			set(nextButtonStyleAtom, "secondary")
		}
	}
);



// Resets relevant atom values and fully disconnects user from server
export const disconnectAtom = atom(
	() => '',
	(_get, set) => {
		set(pageStateAtom, "login")
		set(userPlayerIDAtom, "")
		set(sessionIDAtom, "")
		set(isGameConfiguredAtom, false)
		set(playerAttributesAtom, "")
		set(hostPlayerIDAtom, "")
		set(selectedGameAtom, "")
		disconnect()
	}
);


//Back and Next Buttons
export const backButtonTextAtom = atom("Placeholder");
export const backButtonActiveAtom = atom(true);
export const backButtonClickAtom = atom(
	() => '',
	(get, set) => {
		if (get(pageStateAtom) === "lobby") {
			set(disconnectAtom)
		}
	}
);



export const nextButtonTextAtom = atom("Placeholder");
export const nextButtonActiveAtom = atom(true);
export const nextButtonStyleAtom = atom("inactive" as ButtonTypes)
export const nextButtonClickAtom = atom (
	() => '',
	(get, set) => {
		if (get(pageStateAtom) === "lobby") {
			if (get(userPlayerIDAtom) === get(hostPlayerIDAtom)) {
				C2S_createGame(get(sessionIDAtom), get(userPlayerIDAtom))
			}
		}
	}
);

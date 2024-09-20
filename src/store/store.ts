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

export const listOfPlayersAtom = atom([" "]);

export const isGameConfiguredAtom = atom(false);

// BaseGameLayer display atoms
export const sessionIDAtom = atom(null);
interface NestedObj {
	[key: string]: string
}

interface LooseObj {
	[key: string]: NestedObj
}

type AttributeType = LooseObj | null

export const playerAttributesAtom = atom(null as LooseObj | null,
	(get, set, input: AttributeType) => {
		set(playerAttributesAtom, input)

		if (get(playerAttributesAtom) != null && get(hostPlayerIDAtom) != null)
			set(attributesAndHostSignalAtom, true)
		else
			set(attributesAndHostSignalAtom, false)
	}
);
export const hostPlayerIDAtom = atom(null,
	(get, set, input: string | null) => {
		set(hostPlayerIDAtom, input)

		if (get(playerAttributesAtom) != null && get(hostPlayerIDAtom) != null)
			set(attributesAndHostSignalAtom, true)
		else
			set(attributesAndHostSignalAtom, false)
	}
);
export const hostPlayerUsernameAtom = atom("");
export const attributesAndHostSignalAtom = atom(false);


// Game Selection atoms
export const gamesAtom = atom([GameTypes.shengji]);
export const selectedGameAtom = atom("", // initial value
	(get, set, selectedGame: string) => {
		const games = get(gamesAtom);
		console.log('selectedGame: ', selectedGame);
		if (games.map(x => x.valueOf()).includes(selectedGame) || selectedGame === "") {
			set(selectedGameAtom, selectedGame);
		}
	}
);



// Resets relevant atom values and fully disconnects user from server
export const disconnectAtom = atom(
	() => '',
	(_get, set) => {
		set(pageStateAtom, "login")
		set(userPlayerIDAtom, "")
		set(sessionIDAtom, null)
		set(isGameConfiguredAtom, false)
		set(playerAttributesAtom, null)
		set(hostPlayerIDAtom, null)
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
export const nextButtonClickAtom = atom(
	() => '',
	(get, set) => {

	}
);

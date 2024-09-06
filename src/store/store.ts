import { initSocketConnection } from "../socket/socket";
import { atom } from 'jotai/vanilla'
import { GameTypes } from "../enums/GameTypes.ts";
import { useAtomValue } from "jotai";

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

export const listOfPlayersAtom = atom(['p1', 'p2', 'p3'])

export const sessionIDAtom = atom("Unset");

export const messageHandlerAtom = atom(
	() => '',
	(_get, set, message: string) => {
		console.log("Message received from server. Printing in handleratom...");
		console.log(message);

		const messageObject = JSON.parse(message);
		const stage = messageObject.stage;
		const task = messageObject.task;
		if (stage === "prelobby") {
			if (task === "join_session_ack") {
				set(sessionIDAtom, messageObject.session_id)
			}
		}
	}
);
export const isGameConfiguredAtom = atom(false);

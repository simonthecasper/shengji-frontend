import { initSocketConnection } from "../global/socket";
import { atom } from 'jotai/vanilla'

export const userAtom = atom(''); //{username: ""}
export const inputAtom = atom('');
export const setNameAndConnectServer = atom(
	() => '',
	(get, set) => {
		const userName = get(inputAtom)
		if (userName.length == 0) {
			alert("Please enter a username.");
			return;
		} else if (userName.length > 20) {
			alert("Please enter a shorter username");
			return;
		} else {
			set(userAtom, userName)
		}
		console.log('username: ', userName);

		initSocketConnection();
	}
);
export const isConnectedAtom = atom(false);
export const connectToServerAtom = atom(false)

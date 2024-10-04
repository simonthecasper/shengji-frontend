import { atom } from "jotai/vanilla";
import { playerAttributesAtom } from "./store";

export const chatMessagesAtom = atom([])

export const chatHandlerAtom = atom(
	() => "",
	(get, set, message: string) => {
		const messageObject = JSON.parse(message)
		console.log("chat message received: ", messageObject)
		if (get(playerAttributesAtom) !== null) {
			const playerName = get(playerAttributesAtom)[messageObject.player_id].username
			set(chatMessagesAtom, [...get(chatMessagesAtom), { userName: playerName, text: messageObject.message }])
		}
	})

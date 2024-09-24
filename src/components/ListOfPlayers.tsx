import {
    attributesAndHostSignalAtom,
    hostPlayerIDAtom,
    listOfPlayersAtom,
    playerAttributesAtom,
} from "../store/store";
import { useAtomValue } from "jotai";
import NestedAnyObj from "../types/utility/NestedAnyObj";

const ListOfPlayers = () => {
    const listOfPlayers = useAtomValue(listOfPlayersAtom);
    const playerAttributes = useAtomValue(playerAttributesAtom);
    const hostPlayerID = useAtomValue(hostPlayerIDAtom);

    const attributesAndHostSignal = useAtomValue(attributesAndHostSignalAtom);

    //TODO: implement styling
    return (
        <div className="playerList textCenter padAllSides">
            <h2>Player List</h2>
            <ul>
                {listOfPlayers.map((player) => {
                    return (
                        <li key={player}>
                            {attributesAndHostSignal
                                ? (playerAttributes as NestedAnyObj)[player]["username"] +
                                (hostPlayerID === player
                                    ? " (lobby host)"
                                    : "")
                                : ""}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ListOfPlayers;

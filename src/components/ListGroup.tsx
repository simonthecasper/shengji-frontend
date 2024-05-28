import { useState } from "react";

interface Props {
    heading: string;
    items: string[];
    onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
    // Hook
    const [selectedIndex, setSelectedIndex] = useState(-1);
    // arr[0]; // Variable (selectedIndex)
    // arr[1]; // Update function

    return (
        <>
            <h1>{heading}</h1>

            {items.length === 0 && <p>No item found</p>}

            <ul className="list-group">
                {items.map((item, index) => (
                    <li
                        className={
                            selectedIndex === index
                                ? "list-group-item active"
                                : "list-group-item"
                        }
                        key={item}
                        onClick={() => {
                            setSelectedIndex(index);
                            onSelectItem(item);
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ListGroup;

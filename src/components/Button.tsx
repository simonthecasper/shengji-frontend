interface Props {
    children: string;
    bg?: "primary" | "secondary" | "danger";
    margin?: string;
    padding?: string;
    onClick: () => void;
}

const Button = (props: Props) => {
    return (
        <button className={"btn " + props.bg} onClick={props.onClick}
            style={
                {
                    margin: `${props.margin}`,
                    padding: `${props.padding}`
                }
            }>
            {props.children}
        </button>
    );
};

export default Button;

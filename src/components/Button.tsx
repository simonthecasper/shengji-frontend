interface Props {
    children: string;
    color?: "primary" | "secondary" | "danger";
    onClick: () => void;
}

//  TODO: Make a flexible component
const Button = ({ children, color = "primary", onClick }: Props) => {
    return (
        <button className={"btn btn-" + color} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

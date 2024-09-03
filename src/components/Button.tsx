interface Props {
    children: string;
    bg?: "primary" | "secondary" | "danger";
    onClick: () => void;
}

//  TODO: set up flexible margin and padding 
const Button = ({ children, bg, onClick }: Props) => {
    return (
        <button className={"btn " + bg} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

/* How to use this component: 
  (REQUIRED) Place text you want in on your button inbetween the Button tags e.g. 
  <Button> text goes here </Button>
  The text is passes as the children prop.

  (OPTIONAL) To set the background color use the "bg" attribute. It has three predefined
  colors sets, completed with hover and active color states.
  "primary" is of color blue
  "secondary" is of color green
  "danger" is of color red

  (OPTIONAL) To manually control the margin use the "margin" attribute. It takes a string value 
  that is of the same format of CSS. e.g. 
  margin: top-space right-space bottom-space left space;
  <Button margin="0 0 0 1rem"> text goes here </Button>
  calls for 1rem of space on the left of the container.
  *shortcut* 
  margin: y-axis-space x-axis-space;
  <Button margin="1rem 0"> text goes here </Button>
  calls for 1rem of space on the top and bottom of the container.

  (OPTIONAL) To manually control the padding use the "padding" attribute. It takes a string value 
  that is of the same format of CSS. **see how to use margin attribute**

  (REQUIRED) To provide an event handler onClick to the button, use the "onClick" attribute, pass your 
  handler function to the prop. e.g.
  <Button onClick={handler}> text goes here </Button>
  */
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

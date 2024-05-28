
function Message() {
    // JSX: JAVASCRIPT XML - Gets converted to javascript upon compile
    const name = "Simon";
    if (name)
        return <h1>Hello {name}</h1>;
    return <h1>Hello world</h1>;
}

export default Message;
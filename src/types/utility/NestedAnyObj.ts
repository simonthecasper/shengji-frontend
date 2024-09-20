interface InnerObj {
	[key: string]: string
}

export default interface NestedAnyObj {
	[key: string]: InnerObj
}

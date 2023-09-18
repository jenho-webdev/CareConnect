import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        viewBox="0 0 32 32"
        fill="#31373d"
        {...props}
    >
        <title>{"user"}</title>
        <path d="M4 28q0 .832.576 1.44t1.44.576h20q.8 0 1.408-.576T28 28q0-1.44-.672-2.912t-1.76-2.624-2.496-2.144-2.88-1.504q1.76-1.088 2.784-2.912T24 12v-1.984q0-3.328-2.336-5.664T16 2.016t-5.664 2.336T8 10.016V12q0 2.112 1.024 3.904t2.784 2.912q-1.504.544-2.88 1.504t-2.496 2.144-1.76 2.624T4 28z" />
    </svg>
)
export default SvgComponent

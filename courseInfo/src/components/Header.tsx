import React from "react"
import { HeaderText } from "../types"

const Header: React.FC<HeaderText> = ({ courseName }) => {
    return <h1>{courseName}</h1>
}

export default Header
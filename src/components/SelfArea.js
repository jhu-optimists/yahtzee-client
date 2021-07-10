import React from 'react'
import DiceContainer from "./DiceContainer.js"

export default class SelfArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <DiceContainer />
            </div>
        )
    }

}
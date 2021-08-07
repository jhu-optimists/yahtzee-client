import React, { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../socket'
import OppoDie from './OppoDie'
import OpponentArea from './OpponentArea'
import '../styles/OpponentDice.css'

const OpponentDice = (props) => {
    useEffect(() => {
        console.log(props);
    })

    return(
        <div id="oppo-dice-area">
            {props.username != props.currUser ?
                <div id="oppo-focus">
                    <div id="oppo-rolling">{props.currUser} is rolling...</div>
                    <div id="oppo-dice-container">
                        <OppoDie id={0} pip={props.diceVals[0]} />
                        <OppoDie id={1} pip={props.diceVals[1]} />
                        <OppoDie id={2} pip={props.diceVals[2]} />
                        <OppoDie id={3} pip={props.diceVals[3]} />
                        <OppoDie id={4} pip={props.diceVals[4]} />
                    </div>
                </div>:
                <div></div>
            }
            
            
        </div>
    )
}

export default OpponentDice
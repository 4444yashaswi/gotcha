import React from 'react'
import './Truth.css'
import { IoMenu } from 'react-icons/io5'

const TruthHeader = ({ children, textStyle, btnStyle }) => {
  return (
    <div className="truth-header--container">
        <div className="truth-header--menu" style={{...btnStyle}}>
          <IoMenu fontSize={"3.5vh"} color="#99AFC4" />
        </div>
        <div className="truth-header--title" style={{...textStyle}}>{children}</div>
      </div>
  )
}

export default TruthHeader
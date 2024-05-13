import React from 'react'
import './Truth.css'
import { IoMenu } from 'react-icons/io5'

const TruthHeader = () => {
  return (
    <div className="truth-header--container">
        <div className="truth-header--menu">
          <IoMenu fontSize={"3.5vh"} color="#99AFC4" />
        </div>
        <div className="truth-header--title">The Truth Comes Out Teaser</div>
      </div>
  )
}

export default TruthHeader
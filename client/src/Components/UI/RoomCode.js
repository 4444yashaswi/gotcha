import React from 'react'
import { MdIosShare } from 'react-icons/md';
import { useParams } from 'react-router-dom'
import './RoomCode.css';

const RoomCode = () => {
    const {roomId} = useParams();
  return (
    <div className="room-code--code-container">
          <div className="room-code--code">{roomId || "???? ????"}</div>
          <div className="room-code--code-share-btn">
            <MdIosShare />
          </div>
        </div>
  )
}

export default RoomCode
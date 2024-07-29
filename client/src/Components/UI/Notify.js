import React, { useEffect } from "react";
import "./Notify.css";

const Notify = ({ notification, setNotification }) => {
  useEffect(() => {
    // let notificationTimer;
    console.log(notification);
    let notificationTimer;
    if (notification) {
        clearTimeout(notificationTimer);
        notificationTimer = setTimeout(() => setNotification(null), 2000);
    }
    return () => clearTimeout(notificationTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return (
    <>
      {notification ? (
        <div className="notify--container">
          <div className="notify--background">{notification}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Notify;

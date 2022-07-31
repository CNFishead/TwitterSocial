import React from "react";
import { useSelector } from "react-redux";
import NotificationItem from "../notifcations/NotificationItem.component";
import styles from "./NotificationPopup.module.css";

const NotificationPopup = () => {
  // App State
  const { alerts } = useSelector((state) => state.notifications);
  return (
    <div className={styles.alertWrapper}>
      {alerts &&
        alerts.map((alert) => (
          <div key={alert.id} className={`${styles.alert} ${styles.alert}-${alert.alertType} ellipsis`}>
            <NotificationItem notification={alert.notification} />
          </div>
        ))}
    </div>
  );
};

export default NotificationPopup;

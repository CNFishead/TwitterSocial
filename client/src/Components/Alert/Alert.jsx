import React from "react";
import "./Alert.css";
import { useSelector } from "react-redux";

const Alert = () => {
  // App State
  const alert = useSelector((state) => state.alert);
  return (
    <div className="alert-wrapper">
      {alert.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          <span>{alert.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Alert;

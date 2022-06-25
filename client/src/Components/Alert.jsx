import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  // App State
  const alert = useSelector((state) => state.alert);
  return (
    <div className="alert-wrapper">
      {alert.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.message}
        </div>
      ))}
    </div>
  );
};


export default Alert;

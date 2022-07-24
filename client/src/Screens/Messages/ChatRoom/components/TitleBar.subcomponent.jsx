import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

/**
 * @description -               This component is used to display the title bar of the chat room
 * @notes -                     Sub components are only meant to be used within the parent component
 * @param {Object} props -      The props passed to the component
 * @param {Array} props.users - The users in the chat
 * @param {Object} props.user - The user currently logged in
 * @returns {JSX.Element}
 */
const TitleBar = ({ users, user }) => {
  return (
    <>
      <div className="chatImagesContainer">
        {users &&
          users.map((u, indx) => {
            if (u._id !== user._id) {
              if (indx < 4) {
                return (
                  <div
                    key={u._id}
                    // if its a group chat we need to add the class "groupChat" to the image container
                    className={`chatImagesContainer`}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${indx}`}>{u.firstName}</Tooltip>
                      }
                    >
                      <img src={u.profileImageUrl} alt="profile-chat-pic" />
                    </OverlayTrigger>
                  </div>
                );
              } else {
                return null;
              }
            } else {
              return null;
            }
          })}
      </div>
      {/* If the amount of users in the chat is greater than 4 (i.e, 3 not including the logged in user) render a (+ NumOfUsersRemaining) */}
      <div className="overflow-container">
        {users &&
          users.length >= 4 &&
          (() => {
            const numOfUsersRemaining = users.length - 4;
            return (
              <span>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id={`tooltip-overflow-user-container`}>
                      {users.slice(4).map((u, indx) => {
                        if (u._id !== user._id) {
                          return (
                            <div key={u._id}>
                              {u.firstName}
                              {indx < numOfUsersRemaining - 1 ? ", " : ""}
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </Tooltip>
                  }
                >
                  <span>+ {numOfUsersRemaining} other users</span>
                </OverlayTrigger>
              </span>
            );
          })()}
      </div>
    </>
  );
};

export default TitleBar;

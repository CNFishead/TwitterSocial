import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Actions/User/getUsers";
import UserItem from "../../../Components/UserItem/UserItem";

const SearchUsers = ({ keyword, user, show, setShow }) => {
  const dispatch = useDispatch();
  const {
    listUsers: { users },
  } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers(keyword));
  }, [dispatch, keyword]);

  return (
    <Container>
      {users &&
        users.map((u) => {
          return <UserItem key={u._id} user={u} loggedInUser={user} />;
        })}
    </Container>
  );
};

export default SearchUsers;

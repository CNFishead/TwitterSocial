import React, { useState } from "react";
import "./SearchScreen.css";
import { Container, Form, InputGroup, Nav } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import SearchPosts from "./views/SearchPosts.view";
import SearchUsers from "./views/SearchUsers.view";
import ReplyModal from "../../Components/Modals/ReplyModal";
import { useSelector } from "react-redux";

const SearchScreen = () => {
  const [view, setView] = useState("posts");
  const [timer, setTimer] = useState(null);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const {
    selectedPost: { post },
  } = useSelector((state) => state.post);

  const handleSearch = (e) => {
    e.preventDefault();
    clearTimeout(timer);
    setSearch(e.target.value);
    setTimer(
      setTimeout(() => {
        if (search.length > 0) {
          setKeyword(search.trim());
        } else {
          setKeyword("");
        }
      }, 2000)
    );
  };

  return (
    <Container fluid>
      <div className="searchBarContainer">
        <InputGroup>
          <div className="icon">
            <FaSearch />
          </div>
          <Form.Control
            type="text"
            name="searchBar"
            placeholder={view === "posts" ? "Search Posts" : "Search Users"}
            value={search}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>
      <Container fluid className="tabsContainer">
        <Nav variant="tabs" defaultActiveKey={view}>
          <Nav.Item
            onClick={() => {
              setView("posts");
              setSearch("");
            }}
            className={`tab ${view === "posts" && "active"}`}
          >
            Posts
          </Nav.Item>
          <Nav.Item
            onClick={() => {
              setView("users");
              setSearch("");
            }}
            className={`tab ${view === "users" && "active"}`}
          >
            Users
          </Nav.Item>
        </Nav>
      </Container>
      <Container fluid className="resultsContainer">
        <ReplyModal show={show} setShow={setShow} />
        {view === "posts" && (
          <SearchPosts
            post={post}
            keyword={search}
            show={show}
            setShow={setShow}
            user={user}
          />
        )}
        {view === "users" && <SearchUsers keyword={keyword} user={user} />}
      </Container>
    </Container>
  );
};

export default SearchScreen;

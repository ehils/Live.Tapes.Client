import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"

import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  const userId = parseInt(localStorage.getItem("userId"))
  return (
    <div className={"navBar"}>
      <Navbar sticky="top" bg="flat"  expand="sm" collapseOnSelect={"true"}>
        <Container>
        <Navbar.Brand className="logo">
        <img src="../../imgs/cassettenobakcground.png" width="50px" height="45px" />
        Live.Tapes
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>

            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href={`/library/${userId}`}>Library</Nav.Link>
            {
              localStorage.getItem("auth_token") !== null ?
                <Nav.Link onClick={() => {
                  localStorage.removeItem("auth_token")
                  localStorage.removeItem("userId")
                  history.push({ pathname: "/" })
                }}>
                  Logout
                </Nav.Link>
                :
                <>
                  <Nav.Link to="/login">Login</Nav.Link>
                  <Nav.Link to="/register">Register</Nav.Link>
                </>
            }
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

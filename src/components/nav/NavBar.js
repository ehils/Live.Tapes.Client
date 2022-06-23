import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import NavbarToggle from "react-bootstrap/esm/NavbarToggle"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  const userId = parseInt(localStorage.getItem("userId"))
  return (
    <div className={"navBar"}>
      <Navbar sticky="top" expand="sm" collapseOnSelect={"true"}>
        <Navbar.Brand className="logo">
        <img src="../../imgs/cassette_icon.jpeg" width="50px" height="40px" />
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
      </Navbar>
    </div>
  )
}

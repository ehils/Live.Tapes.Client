import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { registerUser } from "./AuthManager"
import { Container, Row, Col, Form } from "react-bootstrap"
import './Auth.css'
// TODO: This should get you started on registering a new user. 
// Add new fields depending on your server side registration
export const Register = () => {
  const username = useRef()
  const password = useRef()
  const firstName = useRef()
  const lastName = useRef()
  const history = useHistory()

  const handleRegister = (e) => {
    e.preventDefault()

    const newUser = {
      "username": username.current.value,
      "password": password.current.value,
      "first_name": firstName.current.value,
      "last_name": lastName.current.value
    }

    registerUser(newUser).then(res => {
      if ("token" in res) {
        localStorage.setItem("auth_token", res.token)
        history.push("/")
      }
    })
  }

  return (
    <Container>
      <main>
        <Row className="header">
          <Col>
            Live.Tapes
          </Col>
          <Col>
            <img
              width="100px"
              src="../../imgs/cassettenobakcground.png" />
          </Col>
        </Row>
        <Row>
          <Form onSubmit={handleRegister}>
            <Form.Group>
              <Form.Label htmlFor="inputFirstName">
              First Name
              </Form.Label>
              <Form.Control ref={firstName} type="firstName" name="firstName" placeholder="First Name" required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputLastName"> Last Name

              </Form.Label>
              <Form.Control ref={lastName} type="lastName" name="lastName" placeholder="First Name" required/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputUsername">Username

              </Form.Label>
              <Form.Control ref={username} type="text" name="username" placeholder="Username" required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputPassword"> Password

              </Form.Label>
              <Form.Control ref={password} type="password" name="password" placeholder="Password" required/>
            </Form.Group>
            {/* <form onSubmit={handleRegister}>
            <h3>Register an account</h3>
            <fieldset>
              <label htmlFor="inputFirstName"> First Name </label>
              <input ref={firstName} type="firstName" name="firstName" placeholder="First Name" required />
            </fieldset>
            <fieldset>
              <label htmlFor="inputLastName"> Last Name </label>
              <input ref={lastName} type="lastName" name="lastName" placeholder="First Name" required />
            </fieldset>
            <fieldset>
              <fieldset>
                <label htmlFor="inputUsername">Username</label>
                <input ref={username} type="text" name="username" placeholder="Username" required />
              </fieldset>
              <fieldset>
                <label htmlFor="inputPassword"> Password </label>
                <input ref={password} type="password" name="password" placeholder="Password" required />
              </fieldset>
              <button type="submit">Register</button>
            </fieldset>
          </form> */}
            </Form>
        </Row>
        <Row>
          <section>
            Already registered? <Link to="/login">Login</Link>
          </section>
        </Row>
      </main>
    </Container>
  )
}

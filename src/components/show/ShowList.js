// this module takes in a list of shows and lists all of them by the most recent added in the list
// search bar and filter at top of list page'
// show links to show detail
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getUserShows, getAllShows } from './ShowManager'
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import "./Shows.css"
export const ShowList = () => {
    const history = useHistory()
    const [showList, setShowList] = useState([])

    const { userId } = useParams()

    const userList = userId ? true : false

    useEffect(() => {
        if (userList) {
            getUserShows(userId)
                .then(setShowList)
        } else {
            getAllShows().then(setShowList)
        }
    }, [])

    return (
        <>
            <Container>

                
                    <Container><div>
                        {userList
                            ? <button
                                onClick={() => {
                                    history.push({ pathname: "/shows/create" })
                                }}>Add Show</button>
                            : ""}
                    </div></Container>
                    <div>
                        {showList.length === 0 ? "You Have No Shows" : ""}
                    </div>
                    <div>
                        {showList.map(show => {
                            return <Card className='showCard'>
                                <Card.Body>
                                    <Card.Title>
                                        {show.date}
                                    </Card.Title>
                                    <Card.Text>
                                        {show.artist.name}
                                    </Card.Text>
                                    <Card.Text>
                                        Uploaded By: {show.user.firstName} {show.user.lastName}
                                    </Card.Text>
                                    <Card.Link href={`/shows/${show.id}`}>
                                        Listen
                                    </Card.Link>
                                </Card.Body>
                            </Card>

                        }

                        )
                        }
                    </div>
                
            </Container>
        </>
    )
}
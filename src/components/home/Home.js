import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllShows, getUserShows } from '../show/ShowManager';
import { getUserPlaylists, getAllPlaylists } from '../playlist/PlaylistManager'
import { Col, Container, Row, Card } from 'react-bootstrap';


export const Home = () => {
    const [allShows, setAllShows] = useState([])
    const [allPlaylists, setAllPlaylists] = useState([])
    const [myShows, setMyShows] = useState([])
    const [myPlaylists, setMyPlaylists] = useState([])


    const currentUser = parseInt(localStorage.getItem('userId'))
    useEffect(
        () => {
            getAllShows()
                .then(setAllShows).then(
                    getAllPlaylists()
                        .then(setAllPlaylists)
                )
        }, []
    )
    useEffect(
        () => {
            getUserShows(currentUser)
                .then(setMyShows).then(
                    getUserPlaylists(currentUser)
                        .then(setMyPlaylists)
                )
        }, [currentUser]
    )
    // useEffect(
    //     () => {
    //         getAllPlaylists()
    //             .then(setAllPlaylists)
    //     }, []
    // )
    // useEffect(
    //     () => {
    //         getUserPlaylists(currentUser)
    //             .then(setMyPlaylists)
    //     }, []
    // )


    return (
        <>
            <Container>
                <Row>
                    <Col className="title">
                        <h3 c>
                            <Link to={`/shows/`}>
                                New Shows
                            </Link>
                        </h3>
                    </Col>
                </Row>
                <Row className="allShows">
                    {allShows.slice(0, 3).map(
                        show => {
                            return <Col className="showCard" key={show.id}>
                                <Card className="showCard">
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
                                {/* <h4>{show.artist.name}</h4>
                                <h4>{show.date}</h4>
                                <h4>Uploaded by: {show.user.username}</h4>
                                <Link to={`/shows/${show.id}`}>
                                    <div className="showLink">
                                        Listen
                                    </div>
                                </Link> */}
                            </Col>
                        }
                    )}

                </Row>
                <Row>
                    <Col className="title">
                        <h3>
                            <Link to={`/playlists/`}>
                                New Playlists
                            </Link>
                        </h3>
                    </Col>
                </Row>
                <Row className='allPlaylists'>
                    {allPlaylists.slice(0, 3).map(
                        playlist => {
                            return <Col className="playlistCard" key={playlist.id}>
                                <Card className="showCard">
                                    <Card.Body>
                                        <Card.Title>
                                            {playlist.name}
                                        </Card.Title>
                                        <Card.Text>
                                            Submitted By: {playlist.user.firstName} {playlist.user.lastName}
                                        </Card.Text>
                                        <Card.Text>
                                            Featured Tracks:
                                            {playlist.tracks.slice(0, 2).map(
                                                track => {
                                                    return <div className='playlist track'>
                                                        {track.title}
                                                    </div>
                                                }
                                            )}
                                        </Card.Text>
                                        <Card.Link href={`/playlists/${playlist.id}`}>
                                            Listen
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                                {/* <h4>
                                    {playlist.name}
                                </h4>
                                <h4> </h4>
                                <h4>Featured Tracks:</h4>
                                {playlist.tracks.slice(0, 3).map(
                                    track => {
                                        return <div className='playlist track'>
                                            {track.title}
                                        </div>
                                    }
                                )}
                                <div className="playlistLink">
                                    <Link to={`/playlists/${playlist.id}`}>
                                        Listen
                                    </Link>
                                </div> */}
                            </Col>
                        }
                    )}
                </Row>
                <Row>
                    <Col className="title">
                        <h3>
                            <Link to={`/shows/user/${currentUser}`}>
                                Your Shows
                            </Link>
                        </h3>
                    </Col>
                </Row>
                <Row className="myShows">
                    {myShows.length === 0 ? "you have not added any shows" : myShows.slice(0, 3).map(
                        show => {
                            return <Col className="showCard" key={show.id}>
                                <Card className="showCard">
                                    <Card.Body>
                                    <Card.Title>
                                            {show.date}
                                        </Card.Title>
                                        <Card.Text>
                                            {show.artist.name}
                                        </Card.Text>
                                        <Card.Link href={`/shows/${show.id}`}>
                                            Listen
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                                {/* <h4></h4>
                                <h4>{show.date}</h4>
                                <div className="showLink">
                                    <Link to={`/shows/${show.id}`}>
                                        Listen Here
                                    </Link>
                                </div> */}
                            </Col>
                        }
                    )}

                </Row>
                <Row>
                    <Col className="title">
                        <h3>
                            <Link to={`/playlists/user/${currentUser}`}>
                                Your Playlists
                            </Link>
                        </h3>
                    </Col>
                </Row>
                <Row className='myPlaylists'>
                    {myPlaylists.length === 0 ? "You have no playlists" : myPlaylists.slice(0, 3).map(
                        playlist => {
                            return <Col className="playlistCard" key={playlist.id}>
                                <Card className="showCard">
                                    <Card.Body>
                                        <Card.Title>
                                            {playlist.name}
                                        </Card.Title>
                                        <Card.Text>
                                            Featured Tracks: {playlist.tracks.slice(0, 2).map(
                                                track => {
                                                    return <div className='playlist track'>
                                                        {track.title}
                                                    </div>
                                                }
                                            )}
                                        </Card.Text>
                                        <Card.Link href={`/playlists/${playlist.id}`}>
                                            Listen
                                        </Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        }
                    )}
                </Row>
            </Container>
        </>
    )
}
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getUserPlaylists, getAllPlaylists } from './PlaylistManager';
import { Button, Col, Container, Row, Card } from 'react-bootstrap';
export const PlaylistList = () => {
    const history = useHistory()
    const [playlistList, setPlaylistList] = useState([])

    const { userId } = useParams()

    const userList = userId ? true : false

    useEffect(() => {
        if (userList) {
            getUserPlaylists(userId)
                .then(setPlaylistList)
        } else {
            getAllPlaylists().then(setPlaylistList)
        }
    }, [])

    return (
        <Container>

            
                <Container><div>
                    {userList
                        ? <button
                            onClick={() => {
                                history.push({ pathname: "/playlists/create" })
                            }}>
                            CreatePlaylist
                        </button>
                        : ""}
                </div></Container>
                
                    {playlistList.length === 0 ? "You Have No Playlists" : ""}
                
                <div>
                    {playlistList.map(playlist => {
                        return <Card className='playlistCard'>
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
                                            return <Row className='playlist track'>
                                                {track.title}
                                            </Row>
                                        }
                                    )}
                                </Card.Text>
                                <Card.Link href={`/playlists/${playlist.id}`}>
                                    Listen
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    }

                    )
                    }
                </div>
           
        </Container>

    )
}
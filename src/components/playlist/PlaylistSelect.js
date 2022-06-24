import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { AddSong } from './AddSong'
import { getUserPlaylists, getAllPlaylists } from './PlaylistManager'
import { Col, Container, Row } from 'react-bootstrap';

export const PlaylistSelect = ({ trackId }) => {
    const currentUser = parseInt(localStorage.getItem('userId'))
    const [userPlaylists, setUserPlaylists] = useState([])
    const [playlist, setPlaylist] = useState({})
    const { history } = useHistory()
    useEffect(() => {
        getUserPlaylists(currentUser)
            .then(setUserPlaylists)
    }, [currentUser])


    return (
        <>
        
                


                    {userPlaylists.map(
                            (p) => {
                                return (
                                    <Container key={`playlistId--${p.id}`} value={`${p.id}`}>
                                        <Row>
                                            <Col className="playlistSelect">
                                                {`${p.name}`}
                                            </Col>
                                            <Col className="playlistSelect">
                                                <AddSong playlist={p} trackId={trackId} />
                                            </Col>
                                        </Row>
                                    </Container>
                                )
                            }
                        )
                        
                    }

                
            
        </>
    )
}
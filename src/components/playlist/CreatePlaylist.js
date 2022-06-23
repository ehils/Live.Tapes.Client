import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { createPlaylist, getSinglePlaylist, updatePlaylist } from './PlaylistManager';
import { Col, Container, Form, Row } from 'react-bootstrap';
export const CreatePlaylist = () => {
    const { playlistId } = useParams()

    const history = useHistory()

    const currentUser = parseInt(localStorage.getItem('userId'))

    const [playlist, setPlaylist] = useState(
        {
            name: "",
            tracks: []
        }
    )
    const [playlistTracks, setPlaylistTracks] = useState([])
    // const [playlistTracks, setPlaylistTracks] = useState([])

    const editMode = playlistId ? true : false

    useEffect(() => {
        if (editMode) {
            getSinglePlaylist(playlistId)
                .then((r) => {
                    setPlaylist(r)
                    let copy = r.tracks.map(track => {
                        return track.id
                    })
                    setPlaylistTracks(copy)
                }
                )
        }
    }, [playlistId])



    const updateTrackList = (event) => {
        debugger
        let copy = [...playlistTracks]
        if (copy.includes(parseInt(event.target.value))) {
            let index = copy.indexOf(parseInt(event.target.value))
            if (index > -1) {
                copy.splice(index, 1)
                setPlaylistTracks(copy)
            }
        }
    }

    const changePlaylistName = (event) => {
        // TODO: Complete the onChange function
        const newPlaylist = Object.assign({}, playlist)          // Create copy
        newPlaylist[event.target.name] = event.target.value    // Modify copy
        setPlaylist(newPlaylist)
    }

    const makePlaylist = () => {
        if (editMode) {
            updatePlaylist(
                {
                    id: playlistId,
                    name: playlist.name,
                    tracks: playlistTracks
                }
            )
                .then((res) => history.push(`/playlists/${res.id}`))
        }
        else {
            createPlaylist(
                {
                    name: playlist.name
                }
            ).then((res) => history.push(`/playlists/${res.id}`))
        }
    }

    return (
        <>
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Playlist Name:</Form.Label>
                    <Form.Control 
                    type="text"
                    name="name"
                    className='name'
                    placeholder="Enter Playlist Name"
                    value={playlist.name}
                    onChange={changePlaylistName}
                    />
                </Form.Group>
            </Form>
        </Container>
            {/* <fieldset>
                <div>
                    <label htmlFor="searchTerm">Playlist Name:</label>
                    <input
                        type="text"
                        name="name"
                        className='name'
                        placeholder="Enter Playlist Name"
                        value={playlist.name}
                        onChange={changePlaylistName}
                    />
                </div>
            </fieldset> */}
            {playlist.tracks?.length > 0
                ?<Container>
                   
                        {playlist?.tracks.map(track => {
                            // returns an element that is true or flase relative to the conditional
                            let foundTrack = playlistTracks.find(
                                playlistTrack => {
                                    // returns track that is in playlistTrack array
                                    return parseInt(track.id) === parseInt(playlistTrack)
                                }
                            )
                            // if that track is found
                            if (foundTrack) {
                                return <Row key={`p${playlist.id}t${track.id}`}
                                    value={parseInt(track.id)}>
                                    <Col>{track.title}</Col>
                                    <Col><button
                                        value={parseInt(track.id)}
                                        onClick={(e) => {
                                            updateTrackList(e)
                                        }}
                                    >delete</button></Col>
                                </Row>
                            }
                        })}
                </Container>
                : null}
            <Container>

            <button
                onClick={() => {
                    if(!playlist.name) {
                        window.alert("Please Enter Playlist Name")
                    } 
                    else {makePlaylist()
                        history.push(`/playlists/${playlist.id}`)
                    }}}
                    >
                {editMode ? "Save Playlist" : "Create Playlist"}
            </button>
            <button onClick={()=>{
                history.push(`/playlists/user/${currentUser}`)
            }}>Cancel</button>
            </Container>
        </>
    )
}
// renders page of single playlist
// name, date, information at top of page
// player playing song
// list on songs with play button next to song
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MediaPlayer } from "../utils/MediaPlayer"
import { deletePlaylist, getSinglePlaylist } from "./PlaylistManager"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Search, SongSearch } from "../search/SongSearch";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';

export const PlaylistDetail = () => {

    const history = useHistory()

    const { playlistId } = useParams()

    const [playlist, setPlaylist] = useState({})

    const currentUser = parseInt(localStorage.getItem('userId'))

    const userPlaylist = currentUser === playlist.user?.id
        ? true : false

    useEffect(() => {
        getSinglePlaylist(playlistId).then(setPlaylist)

    }, [playlistId])

    const deletePlaylistForGood = (playlist) => {
        deletePlaylist(playlist).then(() => history.push(`/playlists/user/${currentUser}`))
    }
    return (
        <>
            <Container>
                <Row>
                    <h1>{playlist?.name}</h1>
                    <h3>By: {playlist.user?.firstName} {playlist.user?.lastName}</h3>
                </Row>
            </Container>

            {userPlaylist
                ? <div>
                    <Container>

                        <Row>

                            <Col>
                                
                                <Popup trigger={<button>Settings</button>}
                                    position="right center">
                                    {/* <div>
                            <Popup trigger={<button> add songs to playlist</button>}
                                position="right center">
                                <SongSearch setPlaylist={setPlaylist} playlistId={playlist?.id} />
                            </Popup>
                        </div> */}
                                    <Row>

                                        <button
                                            onClick={() => {
                                                history.push(`/playlists/${playlist.id}/songSearch`)
                                            }}>Add Songs to Playlist</button>
                                    </Row>
                                    <Row>
                                        <button
                                            onClick={() => {
                                                history.push(`/playlists/edit/${playlist.id}`)
                                            }}>
                                            Edit Playlist
                                        </button>
                                    </Row>
                                    <Row>
                                        <button
                                            onClick={() => {
                                                window.alert('are you sure you want to delete?')
                                                deletePlaylistForGood(playlist)
                                            }}>Delete Playlist</button>
                                    </Row>
                                </Popup>
                            </Col>

                            <div>

                                {userPlaylist
                                    ? <Col><button
                                        onClick={() => {
                                            history.push(`/playlists/${playlist.id}/songSearch`)
                                        }}>Add Songs to Playlist</button></Col>
                                    : <Col>''</Col>
                                }

                                {/* {userPlaylist
                            ? <Popup trigger={<button> add songs to playlist</button>}
                            position="right center">
                            <SongSearch setPlaylist={setPlaylist} playlistId={playlist?.id} />
                            </Popup>
                        : ""} */}
                                {/* <SongSearch setPlaylist={setPlaylist} playlistId={playlist?.id} /> */}
                            </div>
                        </Row>
                    </Container>
                </div>
                : ""}

            {"tracks" in playlist && playlist.tracks?.length > 0
                ? <Container>
                    <MediaPlayer currentPlaylist={playlist?.tracks} />
                </Container>
                : ""}
            {playlist.tracks?.length > 0
                ? ""
                : "Playlist Has No Songs"}
        </>
    )
}
// renders page of single show
// name, date, information at top of page
// player playing song
// list on songs with play button next to song
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { MediaPlayer } from "../utils/MediaPlayer"
import { deleteShow, getSingleShow } from "./ShowManager"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Col, Container, Row } from 'react-bootstrap';

export const ShowDetail = () => {

    const history = useHistory()

    const { showId } = useParams()

    const [show, setShow] = useState({})

    const currentUser = parseInt(localStorage.getItem('userId'))

    const userShow = currentUser === show.user?.id
        ? true : false

    useEffect(() => {
        getSingleShow(showId).then(setShow)
    }, [])

    const deleteShowForGood = (show) => {
        window.alert('are you sure you want to delete?')
        deleteShow(show).then(() => history.push(`/shows/user/${currentUser}`))
    }

    return (
        <>
            <Container>
                <h1>Show Date: {show.date}</h1>
                <h3>Artist: {show.artist?.name}</h3>
                <h3>Location: {show.location?.location}</h3>
                <h3>Venue: {show.venue?.venue}</h3>
            </Container>
            {userShow
                ? <Container>
                    <div>
                        <Popup width="100px" trigger={<button>Settings</button>}
                            position="right center">
                            <button
                                onClick={() => {
                                    history.push({ pathname: `/shows/${show.id}/addTracks` })
                                }}>Add/Remove Tracks</button>
                            <button
                                onClick={() => {
                                    deleteShowForGood(show)
                                }}>Delete Show</button>
                        </Popup>
                        <div>
                        </div>
                </div>
                </Container> 
                : ""}
<div className="mediaPlayer">
    {"tracks" in show && show.tracks?.length > 0
        ? <Container>
            <MediaPlayer currentPlaylist={show.tracks} />
        </Container>
        : ""}
    {show.tracks?.length > 0
        ? ""
        : "Show Has No Songs"}

</div>
        </>
    )
}
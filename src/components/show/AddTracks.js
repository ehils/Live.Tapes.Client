import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { UploadSongs } from "../utils/UploadSongWidget"
import { getSingleShow, addTrack, deleteTrack } from "./ShowManager"
import { Col, Container, Form, Row } from 'react-bootstrap';
export const AddTracks = () => {
    const history = useHistory()
    const { showId } = useParams()
    const [show, setShow] = useState({
    })
    const [trackNum, setTrackNum] = useState(0)
    const [track, createTrack] = useState({
        showId: showId,
        title: "",
        trackNumber: 0,
        url: "",
        fileString: ''
    })
    const [tracksArray, setTracksArray] = useState([])

    useEffect(() => {
        if (showId) {
            refresh(showId)
        }
    }, [])

    const refresh = (showId) => {
        getSingleShow(showId).then(
            setShow

        )
    }

    



    // const pageRefresh = () =>{
    //     useEffect(()=>{
    //         if(showId){
    //             getSingleShow(showId).then(
    //                 setShow
    //             )
    //         }
    //     })
    // }

    // post for adding track
    // iterate through tracksArray and perform this on each

    const addTrackToArray = (e, track) => {
        e.preventDefault()
        const copy = [...tracksArray]
        copy.push(track)
        setTracksArray(copy)
        createTrack({
            showId: showId,
            title: "",
            trackNumber: 0,
            url: "",
            fileString: ''
        })
    }

    const postTracks = (e) => {
        e.preventDefault()
        tracksArray.forEach(
            (track) => {
                const newTrack = {
                    title: track.title,
                    url: track.url,
                    trackNumber: track.trackNumber,
                    showId: showId
                }
                return addTrack(newTrack)
            }
        )
        refresh(showId)
        setTracksArray([])

    }



    const removeTrack = (track) => {

        const index = parseInt(track) - 1
        tracksArray.splice(index, 1)
        const copy = [...tracksArray]
        setTracksArray(copy)
    }

    const deleteTrackFromShow = (track) => {
        deleteTrack(track).then(() => history.push(`/shows/${showId}/addTracks`))
        refresh(showId)
    }
    return (
        <>
        <Container>

        
            {show.tracks?.length > 0
                ? show.tracks.map(
                    track => {
                        return <Row><div>{track.trackNumber}. {track.title}<button
                            onClick={() => {
                                window.alert('are you sure you want to delete?')
                                deleteTrackFromShow(track)
                            }}>delete</button> </div></Row>

                    }
                )
                : ""}
            <Form>
                <Form.Group>
                    <Form.Label>
                    Track Name
                    </Form.Label>
                    <Form.Control 
                    type="title"
                    className='titleInput'
                    placeholder='add title to show'
                    value={track.title}
                    onChange={(e) => {
                        const copy = { ...track }
                        copy.title = e.target.value
                        createTrack(copy)
                    }}/>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group>
                    <Form.Label>
                    Song Upload
                    </Form.Label>
                    <UploadSongs remove={removeTrack} show={show} addLocalTrack={addTrackToArray} tracksArray={tracksArray} obj={track} update={createTrack} />
                </Form.Group>
            </Form>
            {/* <fieldset>
                <label>Track Name</label>
                <input type="title"
                    className='titleInput'
                    placeholder='add title to show'
                    value={track.title}
                    onChange={(e) => {
                        const copy = { ...track }
                        copy.title = e.target.value
                        createTrack(copy)
                    }}
                />
            </fieldset> */}
            {/* <fieldset>
                <label>Track Number</label>
                <input type="number"
                    className='trackNumberInput'
                    placeholder='trackNumber'
                    value={track.trackNumber}
                    onChange={(e) => {
                        const copy = { ...track }
                        copy.trackNumber = e.target.value
                        createTrack(copy)

                    }}
                />
            </fieldset> */}
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="upload_song">Song File:</label>
                    <UploadSongs remove={removeTrack} show={show} addLocalTrack={addTrackToArray} tracksArray={tracksArray} obj={track} update={createTrack} />
                </div>
            </fieldset> */}
            <button
                onClick={(e) => {
                    // tracksArray.tracks
                    
                    // tracksArray.forEach((t) => {

                        //     if(t.url === null || t.url === undefined){
                        //         window.alert("Please upload an audio file")
                        //     } else {
                        //         postTracks(e)
                        //     }
                        // })

                        let nullUrl = tracksArray.find(
                            (t) => {
                                return t.url === null
                            })

                        if (tracksArray.length > 0 && nullUrl == undefined) {
                            postTracks(e)

                        }
                        else {
                            window.alert("Please upload an audio file")
                        }

                    }}>
                UploadSongs
            </button>
            </Container>
        </>
    )
}
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { UploadSongs } from "../utils/UploadSongWidget"
import { getSingleShow, addTrack, deleteTrack } from "./ShowManager"

export const AddTracks = () => {
    const history = useHistory()
    const {showId} = useParams()
    const [show, setShow] = useState({
    })
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
            {show.tracks?.length > 0
                ? show.tracks.map(
                    track => {
                        return <div>{track.trackNumber}. {track.title}<button
                        onClick={() => {
                            deleteTrackFromShow(track)
                        }}>delete</button> </div>

                    }
                )
                : ""}
            <fieldset>
                <label>Track Name</label>
                <input type="title"
                    className='titleInput'
                    placeholder='add title to show'
                    value={track.title}
                    onChange={(e) => {
                        const copy = { ...track}
                        copy.title = e.target.value
                        createTrack(copy)
                    }}
                />
            </fieldset>
            <fieldset>
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
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="upload_song">Song File:</label>
                    <UploadSongs remove={removeTrack} addLocalTrack={addTrackToArray} tracksArray={tracksArray}obj={track} update={createTrack} />
                </div>
            </fieldset>
            <button
            onClick={(e)=>{
                postTracks(e)
                
            }}>
                UploadSongs
            </button>
        </>
    )
}
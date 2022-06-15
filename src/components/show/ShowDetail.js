// renders page of single show
// name, date, information at top of page
// player playing song
// list on songs with play button next to song
import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { MediaPlayer } from "../utils/MediaPlayer"
import { getSingleShow } from "./ShowManager"
export const ShowDetail = () => {
    const {showId} = useParams()
    
    const [show, setShow] = useState({})

    useEffect (() => {
        getSingleShow(showId).then(setShow)
    },[])
    
    return(
        <>
            <h1>Show Date: {show.date}</h1>
            <h3>{show.artist?.name}</h3>
            <h3>{show.location?.location}</h3>
            <h3>{show.venue?.venue}</h3>
            <div className="mediaPlayer">
            {"tracks" in show ?
                <MediaPlayer currentPlaylist={show.tracks} />
            : null}
            </div>
        </>
    )
}
// renders page of single playlist
// name, date, information at top of page
// player playing song
// list on songs with play button next to song
import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { MediaPlayer } from "../utils/MediaPlayer"
import { getSinglePlaylist } from "./PlaylistManager"
export const PlaylistDetail = () => {
    const {playlistId} = useParams()
    
    const [playlist, setPlaylist] = useState({})

    useEffect (() => {
        getSinglePlaylist(playlistId).then(setPlaylist)

    },[])
    return(
        <>
            <h1>{playlist.name}</h1>
            <h3>Artist Name Here</h3>
            <h3>Venue Name Here</h3>
            <h3>Location Name Here</h3>
            {"tracks" in playlist ?
                <MediaPlayer currentPlaylist={playlist.tracks} />
            : null}
        </>
    )
}
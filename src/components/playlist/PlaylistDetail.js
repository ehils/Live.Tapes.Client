// renders page of single playlist
// name, date, information at top of page
// player playing song
// list on songs with play button next to song
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MediaPlayer } from "../utils/MediaPlayer"
import { getSinglePlaylist } from "./PlaylistManager"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Search, SongSearch } from "../search/SongSearch";

export const PlaylistDetail = () => {

    const { playlistId } = useParams()

    const [playlist, setPlaylist] = useState({})

    const currentUser = parseInt(localStorage.getItem('userId'))

    const userPlaylist = currentUser === playlist.user?.id
        ? true : false

    useEffect(() => {
        getSinglePlaylist(playlistId).then(setPlaylist)

    }, [])
    return (
        <>
            <h1>{playlist?.name}</h1>
            <h3>By: {playlist.user?.username}</h3>

            {"tracks" in playlist && playlist.tracks?.length > 0
                ? <MediaPlayer currentPlaylist={playlist?.tracks} />
                : ""}
            {playlist.tracks?.length > 0
                ? ""
                : "Playlist Has No Songs"}

            {userPlaylist
                ? <Popup trigger={<button> add songs to playlist</button>}
                    position="right center">
                    <SongSearch playlistId={playlist?.id} />
                </Popup>
                : ""}
        </>
    )
}
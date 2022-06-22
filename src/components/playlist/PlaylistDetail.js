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
            <h1>{playlist?.name}</h1>
            <h3>By: {playlist.user?.username}</h3>
            {userPlaylist
                ? <div>
                    <Popup trigger={<button>Settings</button>}
                        position="right center">
                        {/* <div>
                            <Popup trigger={<button> add songs to playlist</button>}
                                position="right center">
                                <SongSearch setPlaylist={setPlaylist} playlistId={playlist?.id} />
                            </Popup>
                        </div> */}
                        <button
                            onClick={()=> {
                                history.push(`/playlists/${playlist.id}/songSearch`)
                            }}>Add Songs to Playlist</button>
                        <button
                            onClick={() => {
                                history.push(`/playlists/edit/${playlist.id}`)
                            }}>
                            Edit Playlist
                        </button>
                        <button
                            onClick={() => {
                                window.alert('are you sure you want to delete?')
                                deletePlaylistForGood(playlist)
                            }}>Delete Playlist</button>
                    </Popup>
                    <div>
                        {/* {userPlaylist
                            ? <Popup trigger={<button> add songs to playlist</button>}
                                position="right center">
                                <SongSearch setPlaylist={setPlaylist} playlistId={playlist?.id} />
                            </Popup>
                            : ""} */}
                            {/* <SongSearch setPlaylist={setPlaylist} playlistId={playlist?.id} /> */}
                            {userPlaylist 
                            ? <button
                            onClick={()=> {
                                history.push(`/playlists/${playlist.id}/songSearch`)
                            }}>Add Songs to Playlist</button>
                        : ""}
                    </div>
                </div>
                : ""}

            {"tracks" in playlist && playlist.tracks?.length > 0
                ? <MediaPlayer currentPlaylist={playlist?.tracks} />
                : ""}
            {playlist.tracks?.length > 0
                ? ""
                : "Playlist Has No Songs"}
        </>
    )
}
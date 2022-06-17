import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { createPlaylist, getSinglePlaylist } from './PlaylistManager';

export const CreatePlaylist = () => {

    const history = useHistory()
    const [playlist, setPlaylist] = useState(
        {
            name: "",
            tracks: []
        }
    )
    // const [playlistTracks, setPlaylistTracks] = useState([])

    // const addOrRemoveSong = playlistId ? true : false



    const changePlaylistName = (event) => {
        // TODO: Complete the onChange function
        const newPlaylist = Object.assign({}, playlist)          // Create copy
        newPlaylist[event.target.name] = event.target.value    // Modify copy
        setPlaylist(newPlaylist)
    }

    const makePlaylist = () => {
        createPlaylist(
            {
                name: playlist.name
            }
        ).then((res) => history.push(`/playlists/${res.id}`))
    }

    return (
        <>
            <fieldset>
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
            </fieldset>
            <button
                onClick={() => {
                    makePlaylist()
                }}
            >
                Create Playlist
            </button>
        </>
    )
}
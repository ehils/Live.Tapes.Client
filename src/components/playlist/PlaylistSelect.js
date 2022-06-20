import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { AddSong } from './AddSong'
import { getUserPlaylists, getAllPlaylists } from './PlaylistManager'

export const PlaylistSelect = ({trackId}) => {
    const currentUser = parseInt(localStorage.getItem('userId'))
    const [userPlaylists, setUserPlaylists] = useState([])
    const [playlist, setPlaylist] = useState({})
    useEffect(() => {
        getUserPlaylists(currentUser)
                .then(setUserPlaylists)
    },[currentUser])


    return(
        <>
        <fieldset>
                <div className="form-group">

                    
                        {
                            userPlaylists.map(
                                (p) => {
                                    return (
                                        <div key={`playlistId--${p.id}`} value={`${p.id}`}>
                                            {`${p.name}`}<AddSong playlistId={p.id} setPlaylist={setPlaylist} trackId={trackId} />
                                        </div>
                                    )
                                }
                            )
                        }
                    
                </div>
            </fieldset>
        </>
    )
}
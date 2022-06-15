import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getUserPlaylists, getAllPlaylists } from './PlaylistManager'
export const PlaylistList = () => {
    
    const [ playlistList, setPlaylistList] = useState([])

    const {userId} = useParams()
    
    const userList = userId ? true : false

    useEffect (() => {
        if (userList){
            getUserPlaylists(userId)
                .then(setPlaylistList)
        } else {
            getAllPlaylists().then(setPlaylistList)
        }
    }, [])

    return(
        <>
        <body>
            {playlistList.map(playlist => { 
                return <div className="playlistCard" key={playlist.id}>
                <h4>
                    {playlist.name}
                </h4>
                <h4>By: {playlist.user.username}</h4>
                <h4>Featured Tracks:</h4>
                {playlist.tracks.slice(0, 3).map(
                    track => {
                        return <div className='playlist track'>
                            {track.title}
                        </div>
                    }
                )}
                <div className="playlistLink">
                    <Link to={`/playlists/${playlist.id}`}>
                        Listen
                    </Link>
                </div>
            </div>
                    }

                )
            }
        </body>
        </>
    )
}
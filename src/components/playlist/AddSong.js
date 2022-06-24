import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getSinglePlaylist, updatePlaylist } from './PlaylistManager';
import { Col, Container, Row } from 'react-bootstrap';

export const AddSong = ({ playlist, trackId }) => {
    const { showId } = useParams()
    const showAdd = showId ? true : false
    const [thisPlaylist, setThisPlaylist] = useState({})
    const history = useHistory()
    useEffect(() => {
        // let mounted = true
            if (showAdd)
            {getSinglePlaylist(playlist.id)
                .then((r) => {

                    let copy = r
                    copy.tracks = r.tracks.map((track) => {
                        return track.id
                    })
                    return copy
                })
                .then(setThisPlaylist)}

        // return () => mounted = false
    }, [])

    const songAddPlaylist = (trackId) => {
        debugger
        const copy = { ...thisPlaylist }
        copy.tracks.push(trackId)
        // returning a prmoise, necessary for .then
        return updatePlaylist(copy)
        // .then(() => {
        //     getSinglePlaylist(playlistId)
        //         .then(setPlaylist)
        // })
    }
    const songAdd = (trackId) => {
        debugger
        const copy = { ...playlist }
        copy.tracks.push(trackId)
        // returning a prmoise, necessary for .then
        return updatePlaylist(copy)
        // .then(() => {
        //     getSinglePlaylist(playlistId)
        //         .then(setPlaylist)
        // })
    }


    return (
        <>


            
                <button  width="30px"
                    onClick={() => {
                        {
                            showAdd
                                ? songAddPlaylist(trackId)
                                    .then(() => history.push(`/shows/${showId}`))
                                : songAdd(trackId)
                                    .then(() => history.push(`/playlists/${playlist.id}`))
                        }
                    }} >Add</button>
                    
            

            {/* if in playlistAdd
                then window alert, song added to playlist
                if not
                return user playlist
                select user playlist
                window alert, song added to playlist */}
        </>
    )


}
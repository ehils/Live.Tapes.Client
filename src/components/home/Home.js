import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllShows, getUserShows } from '../show/ShowManager';
import { getUserPlaylists, getAllPlaylists } from '../playlist/PlaylistManager'


export const Home = () => {
    const [allShows, setAllShows] = useState([])
    const [allPlaylists, setAllPlaylists] = useState([])
    const [myShows, setMyShows] = useState([])
    const [myPlaylists, setMyPlaylists] = useState([])
    

    const currentUser = parseInt(localStorage.getItem('userId'))
    useEffect(
        () => {
            getAllShows()
                .then(setAllShows).then(
                    getAllPlaylists()
                .then(setAllPlaylists)
                )
        }, []
    )
    useEffect(
        () => {
            getUserShows(currentUser)
                .then(setMyShows).then(
                    getUserPlaylists(currentUser)
                .then(setMyPlaylists)
                )
        }, [currentUser]
    )
    // useEffect(
    //     () => {
    //         getAllPlaylists()
    //             .then(setAllPlaylists)
    //     }, []
    // )
    // useEffect(
    //     () => {
    //         getUserPlaylists(currentUser)
    //             .then(setMyPlaylists)
    //     }, []
    // )


    return (
        <>
            <h1>Hello User</h1>
            <h3><Link to={`/shows/`}>
                    New Shows
                </Link>
                </h3>
            <div className="allShows">{allShows.slice(0, 3).map(
                show => {
                    return <div className="showCard" key={show.id}>
                        <h4>{show.artist.name}</h4>
                        <h4>{show.date}</h4>
                        <h4>Uploaded by: {show.user.username}</h4>
                        <Link to={`/shows/${show.id}`}>
                            <div className="showLink">
                                Listen
                            </div>
                        </Link>
                    </div>
                }
            )}
            </div>
            <h3>
                <Link to={`/playlists/`}>
                    New Playlists
                </Link>
            </h3>
            <div className='allPlaylists'>{allPlaylists.slice(0, 3).map(
                playlist => {
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
            )}
            </div>
            <h3><Link to={`/shows/user/${currentUser}`}>
                    Your Shows
                </Link>
                </h3>
            <div className="myShows">{myShows.length === 0 ? "you have not added any shows" : myShows.slice(0, 3).map(
                show => {
                    return <div className="showCard" key={show.id}>
                        <h4>{show.artist.name}</h4>
                        <h4>{show.date}</h4>
                        <div className="showLink">
                            <Link to={`/shows/${show.id}`}>
                                Listen Here
                            </Link>
                        </div>
                    </div>
                }
            )}
            </div>
            <h3><Link to={`/playlists/user/${currentUser}`}>
                    Your Playlists
                </Link>
                </h3>
            <div className='myPlaylists'>{myPlaylists.length === 0 ? "You have no playlists" : myPlaylists.slice(0, 3).map(
                playlist => {
                    return <div className="playlistCard" key={playlist.id}>
                        <h4>
                            {playlist.name}
                        </h4>

                        {playlist.tracks.slice(0, 3).map(
                            track => {
                                return <div className='playlist track'>
                                    {track.title}
                                </div>
                            }
                        )}
                        <div className="playlistLink">
                            <Link to={`/playlists/${playlist.id}`}>
                                Listen Here
                            </Link>
                        </div>
                    </div>
                }
            )}
            </div>

        </>
    )
}
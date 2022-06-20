import React from "react";
import { MediaPlayerControls } from '@cassette/player';
import { PlayerContextProvider, playerContextFilter } from '@cassette/core';
import '@cassette/player/dist/css/cassette-player.css'
import { useParams } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { PlaylistSelect } from "../playlist/PlaylistSelect";
export const MediaPlayer = ({ currentPlaylist, editing }) => {
  const editMode = editing ? true : false
  const playlist = currentPlaylist
  const { showId } = useParams()
  const showMode = showId ? true : false
  const PlaylistMenuSetup = ({ playlist, paused, activeTrackIndex, onTogglePause, onSelectTrackIndex }) => {
    return (
      <ol>
        {playlist.map((track, i) => {
          const isActiveTrack = activeTrackIndex === i;
          return (
            <li key={track.id}>
              {isActiveTrack && !paused
                // both conditions must be satisfied 
                ? <button
                  onClick={() => onTogglePause(i)}>
                  pause symbol
                </button>
                // either of the conditions must be false
                : <button
                  onClick={() => onSelectTrackIndex(i)}
                > Play Symbol
                </button>}
              {track.title}
              {showMode
                ? <Popup trigger={<button> add song to playlist</button>}
                  position="right center">
                  <PlaylistSelect trackId={track.id}/>
                </Popup>
                : ""}
            </li>
          );
        })}
      </ol>
    );
  }

  const PlaylistMenu = playerContextFilter(PlaylistMenuSetup, [
    'playlist',
    'activeTrackIndex',
    'onTogglePause',
    'paused',
    'onSelectTrackIndex'
  ])

  return (
    <>
      <body>
        <h1>Media Player</h1>
        <PlayerContextProvider playlist={playlist}>
          <MediaPlayerControls
            controls={[
              'spacer',
              'playpause',
              'forwardskip',
              'mute',
              'spacer',
              'progress'
            ]} />
          <div className="playlistMenu">
            <PlaylistMenu />
          </div>
        </PlayerContextProvider>
      </body>
    </>
  )
}
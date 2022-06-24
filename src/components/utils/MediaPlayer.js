import React from "react";
import { MediaPlayerControls } from '@cassette/player';
import { PlayerContextProvider, playerContextFilter } from '@cassette/core';
import '@cassette/player/dist/css/cassette-player.css'
import { useParams } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { PlaylistSelect } from "../playlist/PlaylistSelect";
import { Col, Container, Row } from 'react-bootstrap';
import './MediaPlayer.css'
export const MediaPlayer = ({ currentPlaylist, editing }) => {
  const editMode = editing ? true : false
  const playlist = currentPlaylist
  const { showId } = useParams()
  const showMode = showId ? true : false
  const PlaylistMenuSetup = ({ playlist, paused, activeTrackIndex, onTogglePause, onSelectTrackIndex }) => {
    return (
      <Container className="playlistMenu">
        <ol className="playlistTracks">
          {showMode
            ?
            playlist.sort((a, b) => a.trackNumber - b.trackNumber).map((track, i) => {
              const isActiveTrack = activeTrackIndex === i;
              return (

                <Container><li className="track" key={i}>
                  {isActiveTrack && !paused
                    // both conditions must be satisfied 
                    ?
                    
                      
                      <Col><img src="https://cdn-icons-png.flaticon.com/512/16/16427.png" 
                      width="25px" 
                      onClick={() => onTogglePause(i)}/></Col>
                    

                    // either of the conditions must be false
                    :


                    <img src="https://freepngimg.com/thumb/play_button/25623-4-play-button-transparent-background.png"
                      width="25px"
                      onClick={() => onSelectTrackIndex(i)}
                    />

                  }
                  {track.title}
                  <Popup width="200px" trigger={<img src="../../imgs/plussymbol.png" width="30px" />}
                    position="right center">
                    <PlaylistSelect trackId={track.id} />
                  </Popup>

                </li></Container>

              );
            })
            : playlist.map((track, i) => {

              const isActiveTrack = activeTrackIndex === i;
              return (

                <li key={i}>
                  {isActiveTrack && !paused
                    // both conditions must be satisfied 
                    ?
                    
                    <img src="https://cdn-icons-png.flaticon.com/512/16/16427.png" 
                    width="25px" 
                      onClick={() => onTogglePause(i)}
                    />

                    // either of the conditions must be false
                    :
                    <img src="https://freepngimg.com/thumb/play_button/25623-4-play-button-transparent-background.png"
                      width="25px"
                      onClick={() => onSelectTrackIndex(i)}
                    />
                  }

                  {track.title}

                </li>

              );
            })
          }
        </ol>
      </Container>
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

      

      <Row>
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
          <Container>

            <div className="playlistMenu">
              <PlaylistMenu />
            </div>
          </Container>
        </PlayerContextProvider>
      </Row>

    </>
  )
}
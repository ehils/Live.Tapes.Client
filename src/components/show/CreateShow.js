import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createShow } from "./ShowManager";
import { Hint } from 'react-autocomplete-hint';
import { getArtists, getLocations, getVenues } from '../search/SearchManager';

export const CreateShow = () => {
    const history = useHistory()
    const [artists, setArtists] = useState([])
    const [locations, setLocations] = useState([])
    const [venues, setVenues] = useState([])
    const [artistText, setArtistText] = useState('')
    const [locationText, setLocationText] = useState('')
    const [venueText, setVenueText] = useState('')
    const [show, updateShow] = useState({
        date: "",
        artist: "",
        location: "",
        venue: ""
    })

    const submitNewShow = (e) => {
        e.preventDefault()
        if (show.date && show.artist && show.location && show.venue) {
            return createShow(show)
                .then((res) => { return history.push(`/shows/${res.id}`) })
        }
        else {
            window.alert("Please fill out all fields")
        }
    }
    useEffect(() => {
        getArtists().then((r) => {

            let copy = r
            copy = r.map((artist) => {
                return { id: artist.id, label: artist.name }
            })
            return copy
        })
            .then(setArtists)
    }, [])
    useEffect(() => {
        getLocations().then((r) => {

            let copy = r
            copy = r.map((location) => {
                return { id: location.id, label: location.location }
            })
            return copy
        })
            .then(setLocations)
    }, [])
    useEffect(() => {
        getVenues().then((r) => {

            let copy = r
            copy = r.map((venue) => {
                return { id: venue.id, label: venue.venue }
            })
            return copy
        })
            .then(setVenues)
    }, [])



    return (
        <>
            <form >
                <fieldset>
                    <label>Show Date</label>

                    <input type="date"
                        className='dateInput'
                        placeholder='add date to show'
                        value={show.date}
                        onChange={(e) => {
                            const copy = { ...show }
                            copy.date = e.target.value
                            updateShow(copy)

                        }}
                    />
                </fieldset>
                {/* <fieldset>
                    <label>Artist</label>

                    <input type="artist"
                        className='artistInput'
                        placeholder='add artist to show'
                        value={show.artist}
                        onChange={(e) => {
                            const copy = { ...show }
                            copy.artist = e.target.value
                            updateShow(copy)

                        }}
                    />

                </fieldset> */}
                <fieldset>
                    <label>Artist</label>
                    <Hint options={artists} allowTabFill>
                        <input type="artist"
                            className='artistInput'
                            placeholder='add artist to show'
                            value={artistText}
                            onChange={(e) => {
                                setArtistText(e.target.value);
                                const copy = { ...show }
                                copy.artist = e.target.value
                                updateShow(copy)
                            }}
                        />
                    </Hint>
                </fieldset>
                <fieldset>
                    <label>Location</label>
                    <Hint options={locations} allowTabFill>
                        <input type="location"
                            className='locationInput'
                            placeholder='add location to show'
                            value={locationText}
                            onChange={(e) => {
                                setLocationText(e.target.value);
                                const copy = { ...show }
                                copy.location = e.target.value
                                updateShow(copy)
                            }}
                        />
                    </Hint>
                </fieldset>
                <fieldset>
                    <label>Venue</label>
                    <Hint options={venues} allowTabFill>
                        <input type="venue"
                            className='venueInput'
                            placeholder='add venue to show'
                            value={venueText}
                            onChange={(e) => {
                                setVenueText(e.target.value);
                                const copy = { ...show }
                                copy.venue = e.target.value
                                updateShow(copy)
                            }}
                        />
                    </Hint>
                </fieldset>
                {/* <fieldset>
                    <label>location</label>
                    <input type="location"
                        className='locationInput'
                        placeholder='add location to show'
                        value={show.location}
                        onChange={(e) => {
                            const copy = { ...show }
                            copy.location = e.target.value
                            updateShow(copy)

                        }}
                    />
                </fieldset> */}
                {/* <fieldset>
                    <label>venue</label>
                    <input type="venue"
                        className='venueInput'
                        placeholder='add venue to show'
                        value={show.venue}
                        onChange={(e) => {
                            const copy = { ...show }
                            copy.venue = e.target.value
                            updateShow(copy)

                        }}
                    />
                </fieldset> */}
                <div className="submitButtonCreateNewShowForm">

                    <button onClick={(e) => {
                        submitNewShow(e)
                    }} className="submit-button">
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

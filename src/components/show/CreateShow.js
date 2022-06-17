import React , {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { createShow } from "./ShowManager"
export const CreateShow = () => {
    const history = useHistory()
    const [show, updateShow] = useState({
        date: "",
        artist: "",
        location: "",
        venue: ""
    })

    const submitNewShow = (e) => {
        e.preventDefault()
        return createShow(show)
                .then((res) => {return history.push(`/shows/${res.id}`)})
    }
    

    
    return(
        <>
            <fieldset>
                <label>Show Date</label>
                <input type="date"
                className='dateInput'
                placeholder='add date to show'
                value={show.date}
                onChange={(e)=> {
                    const copy = {...show}
                    copy.date = e.target.value
                    updateShow(copy)

                }}
                />
            </fieldset>
            <fieldset>
                <label>Artist</label>
                <input type="artist"
                className='artistInput'
                placeholder='add artist to show'
                value={show.artist}
                onChange={(e)=> {
                    const copy = {...show}
                    copy.artist = e.target.value
                    updateShow(copy)

                }}
                />
            </fieldset>
            <fieldset>
                <label>location</label>
                <input type="location"
                className='locationInput'
                placeholder='add location to show'
                value={show.location}
                onChange={(e)=> {
                    const copy = {...show}
                    copy.location = e.target.value
                    updateShow(copy)

                }}
                />
            </fieldset>
            <fieldset>
                <label>venue</label>
                <input type="venue"
                className='venueInput'
                placeholder='add venue to show'
                value={show.venue}
                onChange={(e)=> {
                    const copy = {...show}
                    copy.venue = e.target.value
                    updateShow(copy)

                }}
                />
            </fieldset>
            <div className="submitButtonCreateNewShowForm">

                        <button onClick={(e) => {
                            submitNewShow(e)
                        }} className="submit-button">
                            Submit
                        </button>
                    </div>
        </>
    )
}

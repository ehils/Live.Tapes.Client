import React, { useState } from "react"

export const UploadSongs = ({ remove, addLocalTrack, tracksArray, obj, update }) => {
    const [uploadedSong, setUploadedSong] = useState('')
    const checkUploadResult = (e, resultEvent) => {
        if (resultEvent.event === "success") {
            const copy = { ...obj }
            copy.url = resultEvent.info.secure_url
            setUploadedSong(`${resultEvent.info.original_filename}.${resultEvent.info.format}`)
            copy.fileString = `${resultEvent.info.original_filename}.${resultEvent.info.format}`
            update(copy)
            addLocalTrack(e, copy)
        }
    }
    const showWidget = (e) => {
        e.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "ehils",
            uploadPreset: "ehils_preset"
        },
            (error, result) => { checkUploadResult(e, result) })
        widget.open()
        // addLocalTrack(e, obj)

    }
    return (
        <>
            <button variant="flat" id="uploadBtn" color="success" outline type="file" onClick={showWidget} >Add File</button>
            {tracksArray
                ? tracksArray.map((obj) => {
                    return <div key={`track_${obj.trackNumber}`}>
                        <p key={`track_${obj.trackNumber}`}>Track:{obj.trackNumber}Title:{obj.title}File:{obj.fileString}</p>
                        <button
                        id={tracksArray.length}
                        onClick={
                            (e) => {
                                remove(e.target.id)
                            }}>delete</button>
                    </div>
                }) 
                : " " }


                    </>
    )
}

            
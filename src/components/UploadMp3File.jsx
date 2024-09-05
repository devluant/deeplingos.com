import React from "react"
import hashText from "../utilities/hashText";
import getLessonData from "../utilities/getLessonData";

export default function UploadMP3File() {
    const [lessonData, setLessonData] = React.useState([])

    const mp3InputRef = React.useRef(null)

    function handleClick() {
        mp3InputRef.current.click()
    }

    function handleChange(e) {
        const file = e.target.files[0]

        if (file) {
            if (file.type === "audio/mpeg" || file.name.endsWith("mp3")) {
                console.log(`${file.name}`)
                hashText(file.name).then(hash => {
                    getLessonData(hash, setLessonData)
                });
            } else {
                console.log("File type not valid. Only accept mp3 audio file.")
                e.target.value = ""
            }
        }
    }

    return (
        <>
            <button onClick={ handleClick }>Upload MP3</button>
            <input onChange={ handleChange } ref={mp3InputRef} type="file" id="mp3-input" accept=".mp3" style={ {display: "none"} } />
            {
                lessonData.length > 0 ? <h1>{ lessonData[0].translation }</h1> : <h1>No Lesson Text Found</h1>
            }
        </>
    )
}
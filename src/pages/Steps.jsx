import React from "react"
import { Link } from "react-router-dom"
import Text from "../components/Text"

export default function Steps(props) {
    const endOfLineElementsRef = React.useRef(null)
    const audioRef = React.useRef(null)
    const endTime = React.useRef(0)

    React.useEffect(() => {
        if (endOfLineElementsRef.current) {
            endOfLineElementsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }

        // Play audio every time there's a new line added
        playAudio()
    } , [props.lines])

    const lineElements = props.lines.map((line, index) => {
        const setRef = node => {
            if (index === props.lines.length - 1) {
                endOfLineElementsRef.current = node
            }
        }

        return <div className="mb-10 px-4" ref={ setRef } key={ line.id }>
            <Text line={ line } />
        </div>
    })

    function handleContinue() {
        if (props.lines.length < props.lessonData.length) {
            props.setLines(prev => [...prev, props.lessonData[prev.length]])                                        
        } else {
            console.log("done")
        }        
    }

    function restartLesson() {
        props.setLines([props.lessonData[0]])
    }

    // Audio Player
    function playAudio() {        
        if(props.lines.at(-1)) {
            const lastLine = props.lines.at(-1)
            audioRef.current.currentTime = lastLine.start
            audioRef.current.play()          
            endTime.current = lastLine.end
        }
    }

    function handleTimeUpdate() {
        const currentTime = audioRef.current.currentTime
        
        if (currentTime >= endTime.current ) {
            audioRef.current.pause()
        }
    }

    function handlePlaybackRate() {
        let currentPlaybackRate = audioRef.current.playbackRate
        if(currentPlaybackRate >= 1.0) {
            audioRef.current.playbackRate = 0.75
        } else {
            audioRef.current.playbackRate = 1.0
        }
        currentPlaybackRate = audioRef.current.playbackRate
        console.log(currentPlaybackRate)
    }

    return (
        <div className="h-screen flex flex-col justify-evenly border-4 border-yellow-300">
            <audio ref={ audioRef } src={ props.audioFile } onTimeUpdate={ handleTimeUpdate } controls></audio>
            <div className="h-[7%] bg-neutral-300">
                <Link to="/">Back</Link>
            </div>
            <div className="h-5/6 overflow-y-auto bg-neutral-200">
                { lineElements }
            </div>

            <div className="h-[7%] px-4 bg-neutral-300">
                {
                    props.lines.length < props.lessonData.length ?
                    <div className="flex justify-between">
                        <button onClick={ handlePlaybackRate }>0.75X</button>
                        <button onClick={ handleContinue }>Continue</button>
                        <button onClick={ playAudio }>Replay</button>
                    </div>
                    : 
                    <div className="flex justify-center">
                        <button onClick={ restartLesson }>Restart Lesson</button>
                    </div>
                }
                
            </div>
        </div>            
    )
}
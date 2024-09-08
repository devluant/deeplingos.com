import React from "react"
import { Link } from "react-router-dom"
import Dialogue from "../components/TextLineTypes/Dialogue"
import Intro from "../components/TextLineTypes/Intro"
import DialogueCTN from "../components/TextLineTypes/DialogueCTN"
import Narrative from "../components/TextLineTypes/Narrative"

export default function Steps(props) {
    const endOfLineElementsRef = React.useRef(null)
    const audioRef = React.useRef(null)
    const endTime = React.useRef(0)
    const [displayTranslation, setDisplayTranslation] = React.useState(false)

    React.useEffect(() => {
        if (endOfLineElementsRef.current) {
            endOfLineElementsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })            
        }

        // Play audio every time there's a new line added
        playAudio()

        // STATS functionality
        stats()
    } , [props.lines])

    const lineElements = props.lines.map((line, index) => {
        const setRef = node => {
            if (index === props.lines.length - 1) {
                endOfLineElementsRef.current = node
            }
        }

        let jsx

        if (line.type === "dialogue") {
            jsx = <Dialogue line={ line } />
        } else if (line.type === "dialogue-ctn") {
            jsx = <DialogueCTN line={ line } />
        } else if (line.type === "intro") {
            jsx = <Intro line={ line } />
        } else {
            jsx = <Narrative line={ line } />
        }

        return <div className={`mb-10 px-4 ${ index === props.lines.length - 1 ? "bg-neutral-50 py-4" : "" }`} ref={ setRef } key={ line.id }>            
            { jsx }
            { displayTranslation && <p>{ line.english }</p>}
        </div>
    })

    function handleContinue() {
        if (props.lines.length < props.lessonData.text.length) {
            props.setLines(prev => [...prev, props.lessonData.text[prev.length]])                                        
        } else {
            console.log("done")
        }        
    }

    function restartLesson() {
        props.setLines([props.lessonData.text[0]])
    }

    function handleDisplayTranslation() {
        setDisplayTranslation(prev => !prev)
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

    // STATS functionality
    function stats() {
        if (props.lines.length === props.lessonData.text.length) {
            // console.log("+1")
            const { lessonId } = props.lessonData.info            

            if (localStorage.getItem("user")) {            
                const userObj =JSON.parse(localStorage.getItem("user"))
                userObj.stats[lessonId].reps += 1
                localStorage.setItem("user", JSON.stringify(userObj))
            } else {
                const newUserObj = {
                    userId: crypto.randomUUID(),
                    stats: {                    
                        [lessonId]: {
                            reps: 1
                        }                             
                    }
                }
                localStorage.setItem("user", JSON.stringify(newUserObj))
            }
        }       
    }

    return (
        <div className="h-screen flex flex-col justify-evenly border-4 border-yellow-300">
            <audio ref={ audioRef } src={ props.audioFile } onTimeUpdate={ handleTimeUpdate } style={ {display: "none"} }></audio>
            <div className="h-[7%] bg-neutral-300 flex items-center px-4 justify-between">
                <Link to="/">Back</Link>
                <div>
                    <button onClick={ handleDisplayTranslation }>EN</button>
                </div>
            </div>
            <div className="h-5/6 overflow-y-auto bg-neutral-200">
                { lineElements }
            </div>

            <div className="h-[7%] px-4 bg-neutral-300 flex items-center">                                    
                    <div className="flex flex-grow justify-between">
                        <button onClick={ handlePlaybackRate }>0.75X</button>
                        {props.lines.length < props.lessonData.text.length ?                        
                        <button onClick={ handleContinue }>Continue</button>
                        :<button onClick={ restartLesson }>Restart Lesson</button>}
                        <button onClick={ playAudio }>Replay</button>
                    </div>                                
            </div>
        </div>
    )
}
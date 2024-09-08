import { Link } from "react-router-dom"
import UploadMP3File from "../components/UploadMp3File"

export default function Home(props) {
    let reps = 0
    let duration = 0
    if (props.lessonData.info != undefined) {
        const { info } = props.lessonData
        const { lessonId, lessonDurationInSeconds } = info
        

        if (localStorage.getItem("userData")) {
            const userData = localStorage.getItem("userData")
            reps = JSON.parse(userData).lessonsData[`${lessonId}`].stats.reps
            duration = lessonDurationInSeconds
        }
    }
    
    return (
        <div className="h-screen border-4 border-red-300">
            <UploadMP3File setLessonData={ props.setLessonData } />
            {
                (props.lessonData.text !== undefined && props.lessonData.text.length > 0) ? 
                <p>:: <Link to="/steps">Start</Link> :: { props.lessonData.info.lessonSubtitle }: { props.lessonData.info.lessonTitle } :: stats={ reps } reps</p> : <h1>No Lesson Text Found</h1>

            }
            <Link to="/export">Export user data</Link>
        </div>
    )
}
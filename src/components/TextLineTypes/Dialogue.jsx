import Text from "../Text"
import DialogueSpeakerName from "./DialogueSpeakerName"

export default function Dialogue(props) {
    return (
        <div className="flex items-start">
            <div className="w-1/5 font-bold">
                <DialogueSpeakerName line={ props.line } />
            </div> 
            <div className="ml-4">:</div>
            <div className="ml-4 w-3/5">
                <Text line={ props.line } />
            </div>
        </div>
    )
}
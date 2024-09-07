import Text from "../Text"
import DialogueSpeakerName from "./DialogueSpeakerName"

export default function DialogueCTN(props) {
    return (
        <div className="flex items-start">
            <div className="opacity-0 w-1/5 font-bold">
                <DialogueSpeakerName line={ props.line } />
            </div>                    
            <div className="opacity-0 ml-4">:</div>
            <div className="ml-4 w-3/5">
                <Text line={ props.line } />
            </div>
        </div>
    )
}
import Text from "../Text"

export default function Intro(props) {
    return (
        <div className="flex justify-center my-4">
            <Text line={ props.line } />
        </div>
    )
}
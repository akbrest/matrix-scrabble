interface OneLetterDisabledInputProps {
    letter: string;
}

const OneLetterDisabledInput: React.FC<OneLetterDisabledInputProps> = ({ letter }) => {
    return <div className="one-symbol-enabled-block">
        <div className="word-block">{letter}</div>
        </div>
    
};

export default OneLetterDisabledInput;

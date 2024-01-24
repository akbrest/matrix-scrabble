interface OneLetterDisabledInputProps {
    letter: string;
}

const OneLetterDisabledInput: React.FC<OneLetterDisabledInputProps> = ({ letter }) => {
    return <input type="text" value={letter} size={1} disabled />;
};

export default OneLetterDisabledInput;

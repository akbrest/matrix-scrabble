import React from "react";

interface MyComponentProps {
    Language: string;
    row: number,
    type: string,
    UpdateField: (x: number, y: number, type: string, value: string) => void;
}

interface State {
    Language: string;
    width: number
}

class EnabledInput extends React.Component<MyComponentProps, State> {

    ClassName: string = "";
    Language;
    AllowedLetters = {
        "en": ['a', 'b', 'c', 'd', 'e'],
        "ru": ["а", "б", "в", "ш"]
    };

    Width: number;

    constructor(props: MyComponentProps) {
        super(props);
        this.Width = 100;
        this.ClassName = this.props.type ? 'one-symbol-enabled-block-' + this.props.type : ''

        this.state = {
            Language: this.props.Language,
            width: 100,
            //UpdateField: this.props.UpdateField
        };

        this.Language = props.Language;
    }

    CheckValidity() {
        return true;
    }

    onChange = (e: any) => {
        console.log(e.target.value)
        var length = e.target.value.length;
        this.setState({ width: length * 20 });

        this.props.UpdateField(this.props.row, 0, this.props.type, e.target.value);
    };

    render() {

        var width = this.state.width;
        var className = this.ClassName;

        return (
            <div style={{ width: width }} className={className}>
                <input style={{ width: width }}
                    onChange={this.onChange}
                    onInput={() => this.CheckValidity()}
                    className="simpleInput"
                    type="text"
                />
            </div>
        );
    }
}

export default EnabledInput;

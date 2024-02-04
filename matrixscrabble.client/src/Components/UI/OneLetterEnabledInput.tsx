import React from "react";

interface MyComponentProps {
  Language: string;
  x: number,
  y: number,
  UpdateField: (x: number, y: number,type:string, value:string) => void;
}

interface State {
  Language: string;
  x: number,
  y: number,
  UpdateField: (x: number, y: number,type:string, value: string) => void;
}

class OneLetterEnabledInput extends  React.Component<MyComponentProps, State> {

  Language;
  AllowedLetters = {
    "en":['a','b','c','d', 'e'],
    "ru" :["а", "б" ,"в", "ш"]    
  };

  constructor(props:  MyComponentProps ){
    super(props);

    this.state = {
      Language: props.Language,
      x: props.x,
      y: props.y,
      UpdateField: this.props.UpdateField
    };

    this.Language = props.Language;
  }

  CheckValidity() {
    return true;
  }

  onChange = (e:any) => {
    this.props.UpdateField(this.props.x, this.props.y, "main", e.target.value);
  };

  render() {
    return (
      <div className="one-symbol-enabled-block">
        <input
          onChange={this.onChange}
          onInput={() => this.CheckValidity()}
          maxLength={1}
          className="simpleInput"
          type="text"
          size={1}
        />
      </div>
    );
  }
}

export default OneLetterEnabledInput;

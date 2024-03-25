import React from "react";
import { Button, Modal } from "react-bootstrap";

interface RulesInterface {
  show: boolean;
  handleClose: () => void;
}

const GameWordField: string[][] = [];

const word = "STONE";
const t = ["kozel", "baran", "vesna", "sadsa", "kksal"];

t.forEach((k) => {
  const val: string[] = [];
  k.split("").forEach((d) => {
    val.push(d);
  });

  GameWordField.push(val);
});

const RulesModal: React.FC<RulesInterface> = ({ show, handleClose }) => {
  let index = 1;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>Welcome to Matrix Scrabble game!</h1>
        <div key="ada22o2o">Here will be added information how to play ...</div>

        <div className="modal-container">
          <div className="modal-block" key="111">
            <div key="sd222aasd">this is Game Field to play</div>
            <div key="help_1">
              {Object.keys(GameWordField).map((keyOuter) => {
                index++;
                return (
                  <div className="modal-field-line">
                    <div className="modal-field-left">{word[index]}</div>
                    <div className="modal-field-left">&nbsp;</div>
                    <div className="modal-field-first modal-field">
                      {word[index]}
                    </div>
                    {Object.keys(GameWordField[keyOuter]).map((keyInner) => {
                      return (
                        <div
                          className="modal-field"
                          key={`${keyInner}-${keyOuter}`}
                        >
                          {GameWordField[keyOuter][keyInner]}
                        </div>
                      );
                    })}
                    <div className="modal-field-last modal-field">
                      {word[word.length - 1 - index]}
                    </div>
                    <div className="modal-field-right">&nbsp;</div>
                    <div className="modal-field-right">&nbsp;</div>
                    <div className="modal-field-right-point">-3</div>
                  </div>
                );
              })}
            </div>
          </div>
          {(index = -1)}
          <div className="modal-block" key="2asdasd22">
            <div key="sda1111sd">this is Game Field to play</div>
            <div key="help_444">
              {Object.keys(GameWordField).map((keyOuter) => {
                index++;
                return (
                  <div className="modal-field-line">
                    <div className="modal-field-left">&nbsp;</div>
                    <div className="modal-field-left">&nbsp;</div>
                    <div className="modal-field-first modal-field">
                      {word[index]}
                    </div>
                    {Object.keys(GameWordField[keyOuter]).map((keyInner) => {
                      return (
                        <div
                          className="modal-field"
                          key={`${keyInner}-${keyOuter}`}
                        >
                          {GameWordField[keyOuter][keyInner]}
                        </div>
                      );
                    })}
                    <div className="modal-field-last modal-field">
                      {word[word.length - 1 - index]}
                    </div>
                    <div className="modal-field-right">&nbsp;</div>
                    <div className="modal-field-right">&nbsp;</div>
                  </div>
                );
              })}
            </div>
          </div>
          {(index = -1)}
          <div className="modal-block" key="222">
            <div key="sdxxxxxasd">this is Game Field to play</div>
            <div key="help_5">
              {Object.keys(GameWordField).map((keyOuter) => {
                index++;
                var b = false;
                if (index == 1) {
                  b = true;
                }
                return (
                  <div className="modal-field-line">
                    {b ? (
                      <React.Fragment>
                        <div className="modal-field-empty">&nbsp;</div>
                        <div className="modal-field-left">&nbsp;</div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {" "}
                        <div className="modal-field-left">&nbsp;</div>
                        <div className="modal-field-left">&nbsp;</div>
                      </React.Fragment>
                    )}
                    <div className="modal-field-left">&nbsp;</div>
                    <div className="modal-field-first modal-field">
                      {word[index]}
                    </div>
                    {Object.keys(GameWordField[keyOuter]).map((keyInner) => {
                      return (
                        <div
                          className="modal-field"
                          key={`${keyInner}-${keyOuter}`}
                        >
                          {GameWordField[keyOuter][keyInner]}
                        </div>
                      );
                    })}
                    <div className="modal-field-last modal-field">
                      {word[word.length - 1 - index]}
                    </div>
                    <div className="modal-field-right">&nbsp;</div>
                  </div>
                );
              })}
            </div>
          </div>
          {(index = -1)}
          <div className="modal-block" key="444">
            <div key="sdasd">this is Game Field to play</div>
            <div key="help_3">
              <div className="modal-field-line">
                <div className="modal-field-empty">&nbsp;</div>
                <div className="modal-field-left">&nbsp;</div>
                <div className="modal-field-left">&nbsp;</div>
                <div className="modal-field-first modal-field">F</div>
                <div className="modal-field">d</div>
                <div className="modal-field">d</div>
                <div className="modal-field">d</div>
                <div className="modal-field-last modal-field">D</div>
                <div className="modal-field-right">&nbsp;</div>
              </div>
              <div className="modal-field-line">
                <div className="modal-field-empty">&nbsp;</div>
                <div className="modal-field-left">&nbsp;</div>
                <div className="modal-field-left">&nbsp;</div>

                <div className="modal-field-first modal-field">F</div>
                <div className="modal-field">d</div>
                <div className="modal-field">d</div>
                <div className="modal-field">d</div>
                <div className="modal-field-last modal-field">D</div>
                <div className="modal-field-right">&nbsp;</div>
              </div>
              <div className="modal-field-line">
                <div className="modal-field-empty">&nbsp;</div>
                <div className="modal-field-left">&nbsp;</div>
                <div className="modal-field-left">&nbsp;</div>

                <div className="modal-field-first modal-field">F</div>
                <div className="modal-field">d</div>
                <div className="modal-field">d</div>
                <div className="modal-field">d</div>
                <div className="modal-field-last modal-field">D</div>
                <div className="modal-field-right">&nbsp;</div>
              </div>
              <div className="modal-field-line">
                <div className="modal-field-empty">&nbsp;</div>
                <div className="modal-field-left">&nbsp;</div>
                <div className="modal-field-left">&nbsp;</div>
                <div className="modal-field-first modal-field">F</div>
                <div className="modal-field">d</div>
                <div className="modal-field">d</div>
                <div className="modal-field">d</div>
                <div className="modal-field-last modal-field">D</div>
                <div className="modal-field-right">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RulesModal;

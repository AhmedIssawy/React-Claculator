import { useEffect, useRef, useState } from "react";
import "./calc.css";

function Calculator() {
  const [inputvalue, setinputvalue] = useState("");
  const [liveResult, setLiveResult] = useState("");
  const element = useRef(null);

  useEffect(() => {
    if (element.current) {
      element.current.focus();
    }
  }, []);

  function display(value) {
    const newInput = inputvalue + value;
    setinputvalue(newInput);
    calculateLive(newInput);
  }

  function addToCalc(e) {
    const validInput = e.target.value.replace(/[^0-9+\-*/.]/g, "");
    setinputvalue(validInput);
    calculateLive(validInput);
  }

  function calculate() {
    try {
      const answer = eval(inputvalue);
      setinputvalue(answer.toString());
      setLiveResult("");
    } catch {
      setLiveResult("Invalid Expression");
    }
  }

  function calculateLive(expression) {
    try {
      const result = eval(expression);
      if (result === undefined || result === null) {
        setLiveResult("");
      } else {
        setLiveResult(result.toString());
      }
    } catch {
      setLiveResult("");
    }
  }

  function clearCalc() {
    setinputvalue("");
    setLiveResult("");
  }

  return (
    <>
      <caption>Calculator</caption>
      <form
        className="calculator"
        name="calc"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="calc-display">
          <input
            type="text"
            className="value"
            ref={element}
            inputMode="numeric"
            value={inputvalue}
            pattern="[0-9+\-*/.]*"
            onChange={(e) => addToCalc(e)}
            placeholder="Type your calculation..."
          />
          <div className="live-result">{liveResult}</div>
        </div>

        <span className="num clear" onClick={clearCalc}>
          c
        </span>
        <span onClick={() => display("/")}>/</span>
        <span onClick={() => display("*")}>*</span>
        <span onClick={() => display("7")}>7</span>
        <span onClick={() => display("8")}>8</span>
        <span onClick={() => display("9")}>9</span>
        <span onClick={() => display("-")}>-</span>
        <span onClick={() => display("4")}>4</span>
        <span onClick={() => display("5")}>5</span>
        <span onClick={() => display("6")}>6</span>
        <span className="plus" onClick={() => display("+")}>
          +
        </span>
        <span onClick={() => display("1")}>1</span>
        <span onClick={() => display("2")}>2</span>
        <span onClick={() => display("3")}>3</span>
        <span onClick={() => display("0")}>0</span>
        <span onClick={() => display("00")}>00</span>
        <span onClick={() => display(".")}>.</span>
        <span className="num equal" onClick={calculate}>
          =
        </span>
      </form>
    </>
  );
}

export default Calculator;

import React, { useState } from "react";

function Rules() {
  const [show, setShow] = useState(true);
  const rulesTitle = show ? "Show Rules" : "Hide Rules";
  const style = {
    display: show ? "none" : "block",
  };
  return (
    <div className="rules">
      <h3 onClick={()=>setShow(!show)}> {rulesTitle} </h3>
      <p style={style}>
        Try to guess the pattern, in both order and color, within ten turns.
        After submitting a row, a small green squared is show for each circle in
        a correct position and color. A yellow square indicates the existence of
        a correct color in an incorrect position. <br />
      </p>
    </div>
  );
}

export default Rules;

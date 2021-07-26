import React, { Component } from "react";
import Chessboard from "chessboardjsx";

import StockFish from "./integrations/Stockfish.js";

export default function Demo(props) {
    console.log("props", props)
    return (
        <div style={boardsContainer}>
            <StockFish updateHistory={props.updateHistory()}>
                {({ position, onDrop }) => (
                    <Chessboard
                        id="stockfish"
                        position={position}
                        width={320}
                        onDrop={onDrop}
                        boardStyle={boardStyle}
                        orientation="black"
                    />
                )}
            </StockFish>
        </div>
    );
}

// class Demo extends Component {

//     render() {

//     }
// }

// export default Demo;

const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
};
const boardStyle = {
    borderRadius: "5px",
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
};

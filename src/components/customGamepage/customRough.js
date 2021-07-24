import rough from 'roughjs/bin/rough';

export const roughSquare = ({ squareElement, squareWidth }) => {
    let rc = rough.svg(squareElement);
    const chessSquare = rc.rectangle(0, 0, squareWidth, squareWidth, {
        roughness: 0.2,
        fill: "AliceBlue",
        bowing: 2,
        fillStyle: "cross-hatch"
    });
    squareElement.appendChild(chessSquare);
};

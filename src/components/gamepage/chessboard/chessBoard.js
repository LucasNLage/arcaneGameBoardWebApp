import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import Chessboard from "chessboardjsx";
import { w3cwebsocket as W3WebSocket } from 'websocket';
import { connect } from "react-redux";

const client = new W3WebSocket('wss:\\agbackend.herokuapp.com/');
// const client = new W3WebSocket('ws:\\192.168.1.75:8000');

class PlayerVsPlayer extends Component {

    static propTypes = { children: PropTypes.func };

    state = {
        fen: "start",
        // square styles for active drop square
        dropSquareStyle: {},
        // custom square styles
        squareStyles: {},
        // square with the currently clicked piece
        pieceSquare: "",
        // currently clicked square
        square: "",
        // array of past game moves
        history: []
    };


    makeRecievedMove = (receivedMove) => {
        this.game.move(receivedMove);
        console.log("\n\nreceivedMove:", receivedMove);
        console.log("\n\nthis.game:", this.game);

        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));

    }

    componentDidMount() {
        this.game = new Chess();
        // Checks if opposing player made a move and updates board
        client.onmessage = (message) => {
            console.log("message in Chessboard:", message.data)
            let messageObj = JSON.parse(message.data)
            if (messageObj && messageObj.san) {
                this.makeRecievedMove(messageObj.san)
            }

            let history = this.game.history({ verbose: true })

            this.setHistory(history);
        }
    }

    // keep clicked square style and remove hint squares
    removeHighlightSquare = () => {
        this.setState(({ pieceSquare, history }) => ({
            squareStyles: squareStyling({ pieceSquare, history })
        }));
    };

    // show possible moves
    highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background:
                                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
                            borderRadius: "50%"
                        }
                    },
                    ...squareStyling({
                        history: this.state.history,
                        pieceSquare: this.state.pieceSquare
                    })
                };
            },
            {}
        );

        this.setState(({ squareStyles }) => ({
            squareStyles: { ...squareStyles, ...highlightStyles }
        }));
    };

    sendMove = (move) => {
        // if move is illegal, don't send to chessboard
        if (move === null) return;

        // Add turn move to the JSON File
        console.log("Sending\n");
        console.log("Move in sendMove:", move);

        // Sends move object to board as a JSON over websocket
        client.send(JSON.stringify(move))
    };

    setHistory = (history) => {
        // if move is illegal, don't send to chessboard
        console.log("history in setHistory:", history)
        if (history === null) return;

        this.props.historyPost(history)

    };

    onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q" // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;
        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));

        // sends move to websocket
        this.sendMove(move);
        console.log("Sending\n");
        let history = this.game.history({ verbose: true })

        this.setHistory(history);
    };



    onMouseOverSquare = square => {
        // get list of possible moves for this square
        let moves = this.game.moves({
            square: square,
            verbose: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        let squaresToHighlight = [];
        for (var i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }

        this.highlightSquare(square, squaresToHighlight);
    };

    onMouseOutSquare = square => this.removeHighlightSquare(square);

    // central squares get diff dropSquareStyles
    onDragOverSquare = square => {
        this.setState({
            dropSquareStyle:
                square === "e4" || square === "d4" || square === "e5" || square === "d5"
                    ? { backgroundColor: "cornFlowerBlue" }
                    : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
        });
    };

    onSquareClick = square => {
        this.setState(({ history }) => ({
            squareStyles: squareStyling({ pieceSquare: square, history }),
            pieceSquare: square
        }));

        let move = this.game.move({
            from: this.state.pieceSquare,
            to: square,
            promotion: "q" // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;

        this.setState({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            pieceSquare: ""
        });
    };

    onSquareRightClick = square =>
        this.setState({
            squareStyles: { [square]: { backgroundColor: "deepPink" } }
        });

    render() {
        const { fen, dropSquareStyle, squareStyles } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            onMouseOverSquare: this.onMouseOverSquare,
            onMouseOutSquare: this.onMouseOutSquare,
            onDrop: this.onDrop,
            dropSquareStyle,
            onDragOverSquare: this.onDragOverSquare,
            onSquareClick: this.onSquareClick,
            onSquareRightClick: this.onSquareRightClick,
        });
    }
}

export function WithMoveValidation(props) {
    return (
        <div>
            <PlayerVsPlayer historyPost={props.HistoryPost}>
                {({
                    position,
                    onDrop,
                    onMouseOverSquare,
                    onMouseOutSquare,
                    squareStyles,
                    dropSquareStyle,
                    onDragOverSquare,
                    onSquareClick,
                    onSquareRightClick
                }) => (
                    <Chessboard
                        id="PlayerVsPlayer"
                        width={320}
                        position={position}
                        onDrop={onDrop}
                        onMouseOverSquare={onMouseOverSquare}
                        onMouseOutSquare={onMouseOutSquare}
                        boardStyle={{
                            borderRadius: "5px",
                            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                        }}
                        squareStyles={squareStyles}
                        dropSquareStyle={dropSquareStyle}
                        onDragOverSquare={onDragOverSquare}
                        onSquareClick={onSquareClick}
                        onSquareRightClick={onSquareRightClick}
                    />
                )}
            </PlayerVsPlayer>
        </div>
    );
}

const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
        [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        ...(history.length && {
            [sourceSquare]: {
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        }),
        ...(history.length && {
            [targetSquare]: {
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        })
    };
};


// Mapping the redux state to our props, so our component can access the redeux
// const mapStateToProps = (state, ownProps) => {
//     return {
//         props: ownProps
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        HistoryPost: (history) => { dispatch({ type: "UPDATE_HISTORY", history: history }) }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(WithMoveValidation)
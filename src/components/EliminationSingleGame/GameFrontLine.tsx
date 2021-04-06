import React from 'react';
import Colors from 'src/styles/colors';

interface Props {
  width: number;
  height: number;
  toDown: boolean;
  isColored: boolean;
}

const GameFrontLine = ({ height, width, toDown, isColored }: Props) => {
  return (
    <div
      className="frontLine"
      style={{
        display: 'flex',
        transform: `translate(0, ${height / 4}px)`,
      }}
    >
      <div
        style={{
          width: '50px',
          height: '2px',
          background: isColored ? Colors.backdropColor : 'none',
        }}
      />
      <div
        style={{
          width: '2px',
          height: `${height / 2 + 2}px`,
          background: isColored ? Colors.backdropColor : 'none',
          transform: toDown
            ? `translate(0, -${height / 2}px)`
            : `translate(0, ${0}px)`,
        }}
      />
    </div>
  );
};

export default GameFrontLine;

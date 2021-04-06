import React from 'react';
import gameUiDetails from 'src/constants/gameUiDetails';
import Colors from 'src/styles/colors';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isFirstRound: boolean;
}

const GameBackLine = ({ isFirstRound, ...props }: Props) => {
  return (
    <div
      className="backLine"
      style={{
        width: gameUiDetails.widthOfLines,
        height: '2px',
        background: !isFirstRound ? Colors.backdropColor : 'none',
      }}
      {...props}
    />
  );
};

export default GameBackLine;

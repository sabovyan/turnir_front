import React from 'react';
import ScoreBoardHeader from './ScoreBoardHeader';

import ScorePicker from '../../components/DigitBoard/ScorePicker';

interface Props {}

const length = 105;

const TestScreen = (props: Props) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // padding: '1rem',
          // background: Colors.sideColor,
        }}
      >
        <ScoreBoardHeader name1={'Vagho'} name2={'Gago'} />
        <ScorePicker left={-1} right={-1} winningPoints={length} pointer={0} />
        {/* <ScorePicker /> */}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // padding: '1rem',
          // background: Colors.sideColor,
        }}
      >
        <ScoreBoardHeader name1={'Vagho'} name2={'Gago'} />
        <ScorePicker left={-1} right={-1} winningPoints={length} pointer={1} />
        {/* <ScorePicker /> */}
      </div>
    </>
  );
};

export default TestScreen;

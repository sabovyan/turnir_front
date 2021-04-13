import React from 'react';
import Backdrop from 'src/components/common/Backdrop/Backdrop';
import Colors from 'src/styles/colors';
import ScoreBoardHeader from './ScoreBoardHeader';

import ScorePicker from './ScorePicker';

interface Props {}

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
        <ScorePicker goalsToWin={7} />
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
        <ScorePicker goalsToWin={7} />
        {/* <ScorePicker /> */}
      </div>
    </>
  );
};

export default TestScreen;

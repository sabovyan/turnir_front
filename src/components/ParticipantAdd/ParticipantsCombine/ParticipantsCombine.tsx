import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuSelect from 'src/components/common/MenuSelect/MenuSelect';
import { RootState } from 'src/store/features';
import { PreParticipant, Side } from 'src/types/main.types';
import AddIcon from '@material-ui/icons/Add';
import { SignatureDeclaration } from 'typescript';
import { swapParticipants } from 'src/store/features/settingsInfo';

interface Props {}

const ParticipantsCombine = (props: Props) => {
  const { participants } = useSelector(
    (state: RootState) => state.settingsInfo,
  );

  const dispatch = useDispatch();

  const handleSelectChange = (
    currentParticipant: PreParticipant,
    currentIndex: number,
    side: Side,
  ) => (event: ChangeEvent<HTMLInputElement>) => {
    const wanted = event.target.value;

    console.log(wanted);

    const foundIndex = participants.findIndex((pl) => pl.name === wanted);

    if (foundIndex > -1) {
      dispatch(swapParticipants({ currentIndex, foundIndex, side }));

      // const temp = participants[currentIndex];

      // participants[currentIndex] = participants[foundIndex];
      // participants[currentIndex].side = side;
      // participants[foundIndex] = temp;
      // participants[foundIndex].side = temp.side;
      // console.log(participants);
      // dispatch(swapParticipants({ main: currentParticipant, second: found }));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1rem',
      }}
    >
      <div>
        {participants
          .filter((p) => p.side === Side.left)
          .map((pl: PreParticipant, idx: number) => (
            <div style={{ display: 'flex', margin: '1rem 0' }} key={pl.name}>
              <MenuSelect
                list={participants}
                value={pl.name}
                onChange={handleSelectChange(pl, idx, Side.left)}
                style={{ minWidth: '150px' }}
                key={pl.name}
              />
            </div>
          ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Array.from({ length: participants.length / 2 }).map((_, idx) => (
          <AddIcon
            style={{ fontSize: '2rem', margin: '11px 1rem' }}
            key={idx}
          />
        ))}
      </div>

      <div>
        {participants
          .filter((p) => p.side === Side.right)
          .map((pl, idx) => (
            <div style={{ display: 'flex', margin: '1rem 0' }} key={pl.name}>
              <MenuSelect
                list={participants}
                value={pl.name}
                onChange={handleSelectChange(pl, idx, Side.right)}
                style={{ minWidth: '150px' }}
                key={pl.name}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ParticipantsCombine;

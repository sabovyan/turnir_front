import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuSelect from 'src/components/common/MenuSelect/MenuSelect';
import { RootState } from 'src/store/features';
import { Participant, Side } from 'src/types/main.types';
import AddIcon from '@material-ui/icons/Add';
import {
  pairParticipants,
  swapParticipants,
} from 'src/store/features/settingsInfo';

interface Props {}

const ParticipantsCombine = (props: Props) => {
  const { draftParticipants, sides } = useSelector(
    (state: RootState) => state.settingsInfo,
  );

  const dispatch = useDispatch();

  const handleSelectChange = (currentParticipant: Participant) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const wanted = event.target.value;

    const foundParticipant = draftParticipants.find((p) => p.name === wanted);

    if (foundParticipant) {
      dispatch(swapParticipants({ currentParticipant, foundParticipant }));
      dispatch(pairParticipants());
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
      }}
    >
      {sides.left.map((pl, idx) => (
        <div style={{ display: 'flex', margin: '1rem 0' }} key={pl.name}>
          <MenuSelect
            list={draftParticipants}
            value={pl.name}
            onChange={handleSelectChange(pl)}
          />
          <AddIcon style={{ fontSize: '2rem', margin: '0 1rem' }} />
          <MenuSelect
            list={draftParticipants}
            value={sides.right[idx].name}
            onChange={handleSelectChange(sides.right[idx])}
          />
        </div>
      ))}
    </div>
  );
};

export default ParticipantsCombine;

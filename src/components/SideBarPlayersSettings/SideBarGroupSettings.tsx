import React, {
  ChangeEvent,
  DragEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import Paper from '@material-ui/core/Paper';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';
import SideBarGroupCard from './SideBarGroupCard';
import { RootState } from '../../store/features';
import { useSelector } from 'react-redux';
import CloseButton from '../common/Buttons/CloseButton/CloseButton';
import colors from '../../styles/colors';
import CreateNewGroupForm from './CreateNewGroupForm';
import GroupPlayerList from '../GroupsModal/GroupPlayerList';
import { MenuItem } from '@material-ui/core';
import FormField from '../Input/FormField';
import Typography from '@material-ui/core/Typography';
import { GroupResponse, PlayerResponse } from '../../types/main.types';

interface Props {
  open: boolean;
  onCloseIconClick: () => void;
}

const none = { id: 0, isEdit: false, name: 'none', players: [], userId: 0 };

const SideBarGroupSettings = ({ open, onCloseIconClick }: Props) => {
  const { groups, players } = useSelector((state: RootState) => state);

  const [activeGroup, setActiveGroup] = useState<
    GroupResponse & {
      isEdit: boolean;
    }
  >(none);
  const [activePlayers, setActivePlayers] = useState<PlayerResponse[]>([]);

  const handleGroupSelectEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const groupId = event.target.value;

    const foundGroup = groups.find((group) => group.id === Number(groupId));

    if (foundGroup) {
      setActiveGroup(foundGroup);
    }
  };

  const handleClose = (event: any) => {
    if (event.target.className === 'MuiBackdrop-root') onCloseIconClick();
  };

  const handleDeleteEvent = () => {
    setActiveGroup(groups[0]);
  };

  useEffect(() => {
    if (activeGroup && activeGroup.id) {
      const foundGroup = groups.find((group) => group.id === activeGroup.id);

      if (foundGroup) {
        setActivePlayers(foundGroup.players);
      }
    }
    if (!groups.length) {
      setActiveGroup(none);
    }
  }, [activeGroup, groups]);

  return (
    <>
      <CustomBackdrop open={open} zIndex={1001} onClick={handleClose}>
        <div style={{ width: '200px' }}></div>
        <Paper
          elevation={3}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem',
            minWidth: '400px',
            maxWidth: '1200px',
            backgroundColor: colors.sideColor,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',

              justifyContent: 'flex-end',
            }}
          >
            <div>
              <Typography color="primary" variant="h6">
                Choose the group
              </Typography>
              <FormField
                select
                label=""
                value={activeGroup.id}
                style={{ marginBottom: '0', width: 200, background: 'white' }}
                fullWidth={false}
                onChange={handleGroupSelectEvent}
              >
                <MenuItem key={'none'} value={0} disabled>
                  {'none'}
                </MenuItem>

                {groups && groups.length
                  ? groups.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))
                  : null}
              </FormField>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              overflow: 'auto',
            }}
          >
            <SideBarGroupCard
              groupId={0}
              isEdit={false}
              groupName="All Players"
              isEditable={false}
              onDelete={() => {}}
            >
              <GroupPlayerList
                isSelectable={true}
                players={players}
                isDraggable={true}
                deleteButton={false}
                groupId={0}
              />
            </SideBarGroupCard>
            {activeGroup && activeGroup.id ? (
              <SideBarGroupCard
                groupId={activeGroup.id}
                isEdit={activeGroup.isEdit}
                groupName={activeGroup.name}
                isEditable={true}
                onDelete={handleDeleteEvent}
              >
                <GroupPlayerList
                  isDraggable={false}
                  isSelectable={false}
                  groupId={activeGroup.id}
                  players={activePlayers}
                  deleteButton={true}
                  currentGroupId={activeGroup.id}
                />
              </SideBarGroupCard>
            ) : (
              <SideBarGroupCard
                groupId={none.id}
                isEdit={none.isEdit}
                groupName="no group is found"
                isEditable={false}
                onDelete={() => {}}
              ></SideBarGroupCard>
            )}
          </div>

          <CreateNewGroupForm />
        </Paper>
      </CustomBackdrop>
    </>
  );
};

export default SideBarGroupSettings;

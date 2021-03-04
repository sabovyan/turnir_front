import React, { ChangeEvent, DragEvent, MouseEvent, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';
import SideBarGroupCard from './SideBarGroupCard';
import { RootState } from '../../store/features';
import { useSelector } from 'react-redux';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import colors from '../../styles/colors';
import CreateNewGroupForm from './CreateNewGroupForm';
import GroupPlayerList from '../GroupsModal/GroupPlayerList';
import { MenuItem } from '@material-ui/core';
import FormField from '../Input/FormField';
import Typography from '@material-ui/core/Typography';
import { GroupResponse } from '../../types/main.types';

interface Props {
  open: boolean;
  onCloseIconClick: () => void;
}

enum SelectionMethod {
  single = 'single',
  multiple = 'multiple',
}

const SideBarGroupSettings = ({ open, onCloseIconClick }: Props) => {
  const { groups, players } = useSelector((state: RootState) => state);

  const [activeGroup, setActiveGroup] = useState<
    GroupResponse & {
      isEdit: boolean;
    }
  >(groups[0]);

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
    console.log(activeGroup.id);
    setActiveGroup(groups[0]);
  };

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
                {groups &&
                  groups.length &&
                  groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
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
                players={
                  groups.find((group) => group.id === activeGroup.id)!.players
                }
                deleteButton={true}
              />
            </SideBarGroupCard>
          </div>

          <CreateNewGroupForm />
        </Paper>
      </CustomBackdrop>
    </>
  );
};

export default SideBarGroupSettings;

import React, { DragEvent } from 'react';

import { CardContentProps, List } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardContent from '@material-ui/core/CardContent';
import GroupCard from '../GroupCard/GroupCard';
import GroupNameEditForm from '../Forms/EditForm/GroupNameEditForm';
import groupService from '../../services/groups.service';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeGroupEditStatusById,
  removeGroup,
  updatePlayersInGroup,
} from '../../store/features/groups.feature';
import { RootState } from '../../store/features';
import { nullifyTransfer } from '../../store/features/playersToTransfer.feature';

interface Props extends CardContentProps {
  groupName: string;
  isEditable: boolean;
  isEdit: boolean;
  groupId: number;
  onDelete: () => void;
}

const SideBarGroupCard = ({
  children,
  groupName,
  isEditable,
  isEdit,
  groupId,
  onDelete,
}: Props) => {
  const dispatch = useDispatch();
  const playersToTransfer = useSelector(
    (state: RootState) => state.playersToTransfer,
  );

  const handleDeleteIconClick = (id: number) => async () => {
    const res = await groupService.deleteGroupById({ slug: id });

    if (res) {
      onDelete();
      dispatch(removeGroup(res));
    }
  };
  const handleEditIconClick = (id: number) => async () => {
    dispatch(changeGroupEditStatusById({ id }));
  };

  const handleDragOverEvent = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropEvent = async (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    let group;

    if (!playersToTransfer) return;

    if (!(playersToTransfer instanceof Array)) {
      group = await groupService.addSinglePlayerToGroup({
        groupId,
        playerId: playersToTransfer.id,
      });
    } else {
      const playerIds = playersToTransfer.map((player) => ({ id: player.id }));
      group = await groupService.addMultiplePlayersToGroup({
        groupId,
        playerIds,
      });
    }

    if (!group) return;
    dispatch(updatePlayersInGroup(group));
    dispatch(nullifyTransfer(null));
  };

  return (
    <GroupCard>
      {isEdit ? (
        <GroupNameEditForm id={groupId} value={groupName} />
      ) : (
        <CardHeader
          title={groupName}
          action={
            isEditable && (
              <>
                <IconButton onClick={handleEditIconClick(groupId)}>
                  <EditIcon />
                </IconButton>

                <IconButton onClick={handleDeleteIconClick(groupId)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )
          }
        />
      )}
      <CardContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 0 3px 1px #333333',
            minHeight: '500px',
            minWidth: '200px',
          }}
        >
          <List
            style={{
              overflowY: 'auto',
              width: '100%',
              padding: '1rem',
              height: '500px',
            }}
            draggable
            onDragOver={isEditable ? handleDragOverEvent : undefined}
            onDrop={isEditable ? handleDropEvent : undefined}
          >
            {children}
          </List>
        </div>
      </CardContent>
    </GroupCard>
  );
};

export default SideBarGroupCard;

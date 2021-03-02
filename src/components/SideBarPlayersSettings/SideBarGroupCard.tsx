import React from 'react';

import { CardContentProps } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardContent from '@material-ui/core/CardContent';
import GroupCard from '../GroupCard/GroupCard';
import GroupNameEditForm from '../Forms/EditForm/GroupNameEditForm';
import groupService from '../../services/groups.service';
import { useDispatch } from 'react-redux';
import {
  changeGroupEditStatusById,
  removeGroup,
} from '../../store/features/groups.feature';

interface Props extends CardContentProps {
  groupName: string;
  isEditable: boolean;
  isEdit: boolean;
  groupId: number;
}

const SideBarGroupCard = ({
  children,
  groupName,
  isEditable,
  isEdit,
  groupId,
}: Props) => {
  const dispatch = useDispatch();

  const handleDeleteIconClick = (id: number) => async () => {
    const res = await groupService.deleteGroupById({ slug: id });

    if (res) {
      dispatch(removeGroup(res));
    }
  };
  const handleEditIconClick = (id: number) => async () => {
    dispatch(changeGroupEditStatusById({ id }));
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
      <CardContent>{children}</CardContent>
    </GroupCard>
  );
};

export default SideBarGroupCard;

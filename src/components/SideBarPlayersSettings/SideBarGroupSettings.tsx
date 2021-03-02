import { Card, Fab, Paper, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import CustomBackdrop from '../CustomBackdrop/CustomBackdrop';

import SideBarGroupCard from './SideBarGroupCard';
import SideBarPlayerList from './SideBarPlayerList';
import useAuth from '../../services/authentication';
import groupService from '../../services/groups.service';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from '../../store/features/groups.feature';
import { RootState } from '../../store/features';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import CButton from '../Buttons/CustomButton/CustomButton';
import FormField from '../Input/FormField';
import GroupCard from '../GroupCard/GroupCard';
import AddIcon from '@material-ui/icons/Add';
import colors from '../../styles/colors';
import { orange } from '@material-ui/core/colors';
import CreateNewGroupForm from './CreateNewGroupForm';

interface Props {
  open: boolean;
  onCloseIconClick: () => void;
}

const SideBarGroupSettings = ({ open, onCloseIconClick }: Props) => {
  const groups = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleCloseIconClick = () => {
    onCloseIconClick();
  };

  console.log(groups);

  useEffect(() => {
    if (!user) return;

    groupService
      .fetchAllGroups({ userId: user.id })
      .then((res) => {
        if (res) {
          dispatch(getAllGroups(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, user]);

  return (
    <>
      <CustomBackdrop open={open} zIndex={1001}>
        <div style={{ width: '200px' }}></div>
        <Paper
          elevation={3}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            minWidth: '400px',
            maxWidth: '1200px',
            backgroundColor: colors.sideColor,
          }}
        >
          <CloseButton
            style={{ alignSelf: 'flex-end', color: colors.green }}
            onClick={handleCloseIconClick}
          />

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              overflow: 'auto',
              padding: '1rem',
            }}
          >
            <SideBarGroupCard
              groupId={0}
              isEdit={false}
              groupName="All Players"
              isEditable={false}
            >
              <SideBarPlayerList isEditable={false} view="groups" />
            </SideBarGroupCard>
            {groups.length
              ? groups.map((group) => (
                  <SideBarGroupCard
                    groupId={group.id}
                    isEdit={group.isEdit}
                    groupName={group.name}
                    isEditable={true}
                    key={group.id}
                  ></SideBarGroupCard>
                ))
              : null}
          </div>
          <CreateNewGroupForm />
        </Paper>
      </CustomBackdrop>
    </>
  );
};

export default SideBarGroupSettings;

import { useCallback, useEffect, useMemo, useState } from 'react';
import { playersGroupRequest, playersRequest } from '../api';
import useAuth from './authentication';
import authStorage from './storage';

export type PlayerResponse = {
  id: number;
  name: string;
  tournamentId: number | null;
  userId: number;
};

export type GroupResponse = {
  id: number;
  name: string;
  userId: number;
  players: PlayerResponse[];
};

type newGroupData = {
  name: string;
};

type GetAllGroupsOrPlayers = {
  token: string;
  userId: number;
};

const setEditablePlayer = (player: PlayerResponse) => ({
  ...player,
  isEdit: false,
});

const useGroups = () => {
  const [groups, setGroups] = useState<GroupResponse[]>();

  const { user } = useAuth();
  const accessToken = authStorage.getAccessToken();

  const getAllGroups = useCallback(
    ({ token, userId }: GetAllGroupsOrPlayers) =>
      playersGroupRequest.doGet({
        url: '',
        token,
        data: {
          userId,
        },
      }),
    [],
  );

  // const getGroupById = (slug: number, token: string) =>
  //   playersGroupRequest.doGet({
  //     url: `${slug}`,
  //     token,
  //   });

  const addNewGroup = ({ name }: newGroupData) => {
    // playersGroupRequest.doPost({
    //   url: '/all',
    //   data: { name, userId: user && user.id },
    //   token: accessToken ? accessToken : undefined,
    // });
  };

  const updateGroups = () => {
    if (!accessToken || !user) return;

    getAllGroups({ token: accessToken, userId: user.id }).then((res) => {
      setGroups(res.data);
    });
  };

  useEffect(() => {
    if (!accessToken || !user) return;

    getAllGroups({ token: accessToken, userId: user.id }).then((res) => {
      setGroups(res.data);
    });
  }, [accessToken, getAllGroups, user]);

  return {
    groups,
    // getGroupById,
    addNewGroup,
    updateGroups,
  };
};

export default useGroups;

import { playersGroupRequest } from '../api';
import { GroupResponse } from '../types/main.types';
import authStorage from './storage';

type FetchAllGroupsRequest = {
  userId: number;
};

type CreateNewGroupRequest = {
  userId: number;
  name: string;
};

type RequestWithSlug = {
  slug: number;
};

type UpdateGroupNameRequest = {
  name: string;
  userId: number;
  groupId: number;
};

const fetchAllGroups = async ({ userId }: FetchAllGroupsRequest) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const res = await playersGroupRequest.doGet({
    url: `all/${userId}`,
    token,
  });

  const groups = (await res.data) as GroupResponse[];
  return groups;
};

const createNewGroup = async ({ userId, name }: CreateNewGroupRequest) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const res = await playersGroupRequest.doPost({
    url: '',
    token,
    data: { userId, name },
  });

  const group = (await res.data) as GroupResponse;
  return group;
};

const deleteGroupById = async ({ slug }: RequestWithSlug) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const res = await playersGroupRequest.doDelete({
    url: `${slug}`,
    token,
  });

  const group = (await res.data) as GroupResponse;
  return group;
};

const updateGroupNameById = async (data: UpdateGroupNameRequest) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const res = await playersGroupRequest.doUpdate({ url: '', token, data });

  const group = (await res.data) as GroupResponse;
  return group;
};

const getGroupById = async ({ slug }: RequestWithSlug) => {
  const token = authStorage.getAccessToken();

  if (!token) return;

  const res = await playersGroupRequest.doGet({ url: `${slug}`, token });

  const group = (await res.data) as GroupResponse;
  return group;
};

const groupService = {
  fetchAllGroups,
  createNewGroup,
  deleteGroupById,
  updateGroupNameById,
  getGroupById,
};

export default groupService;

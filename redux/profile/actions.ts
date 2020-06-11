import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsAuthorized, spotifyApi } from '../utils';
import { CombinedStateType } from '../types';

export const fetchUserProfile = createAsyncThunk<
SpotifyApi.CurrentUsersProfileResponse,
void,
{ state: CombinedStateType }
>(
  'profile/set',
  async (_, { getState }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;

    const { errorMessage } = state.user.tokenStatus;
    checkIsAuthorized(accessToken, expiresAt, errorMessage);
    spotifyApi.setAccessToken(accessToken);
    return await spotifyApi.getMe();
  },
);

import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { checkIsAuthorized, getAllPages, spotifyApi } from '../utils';
import { setTracks } from '../tracks/actions';
import { CombinedStateType } from '../types';

interface FetchUserPlaylistItemsPayload {
  playlistId: string;
  playlistItems: SpotifyApi.PlaylistTrackObject[];
}

const getAllTracksFromPlaylistItems = (
  playlistItems: SpotifyApi.PlaylistTrackResponse,
): SpotifyApi.TrackObjectFull[] => playlistItems.items.map(
  (playlistItem) => (playlistItem.track as SpotifyApi.TrackObjectFull),
);

export const deletePlaylistsItems = createAction<{isFetching: boolean}>('playlistsItems/delete');

export const fetchUserPlaylistItems = createAsyncThunk<
FetchUserPlaylistItemsPayload,
// TODO: remove fetchPlaylistItemsAudioFeatures. Will call this action directly
// from the component
{ playlistId: string; dispatchSetAudioFeatures?: boolean },
{ state: CombinedStateType }
>(
  'playlistItems/set',
  async ({ playlistId, dispatchSetAudioFeatures = false }, { dispatch, getState }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    spotifyApi.setAccessToken(accessToken);

    const fullResponse = await getAllPages<SpotifyApi.PlaylistTrackResponse>(
      spotifyApi.getPlaylistTracks(playlistId, { limit: 50 }),
    );
    dispatch(setTracks(getAllTracksFromPlaylistItems(fullResponse)));
    return { playlistId, playlistItems: fullResponse.items };
  },
);

export const fetchAllUserPlaylistsItems = createAsyncThunk<
void,
void,
{ state: CombinedStateType }
>(
  'allPlaylistsItems/set',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    spotifyApi.setAccessToken(accessToken);

    dispatch(deletePlaylistsItems({ isFetching: true }));

    const playlists = state.playlists.data;

    const allPlaylistIds = Object.keys(playlists);

    await Promise.all(
      allPlaylistIds.map((playlistId) => dispatch(fetchUserPlaylistItems({ playlistId }))),
    );
  },
);
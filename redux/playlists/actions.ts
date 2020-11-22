import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { checkIsAuthorized, getAllPages, spotifyApi } from '../utils';
import { CombinedStateType } from '../types';

export const deletePlaylists = createAction<void>('playlists/delete');

const userLibraryPlaylist = {
  tracks: {
    href: '',
    total: -1,
  },
  collaborative: false,
  external_urls: {
    spotify: '',
  },
  href: '',
  description: 'Liked tracks',
  id: 'userLibrary',
  images: [{
    url: '/cover_art/spotify_likes_icon.png',
  }],
  name: 'Saved Tracks',
  owner: {
    external_urls: {
      spotify: '',
    },
    href: '',
    id: '',
    type: 'user' as const,
    uri: '',
  },
  public: false,
  snapshot_id: '',
  type: 'playlist' as const,
  uri: '',
};

export const updateUserPlaylistInfo = createAsyncThunk<
void,
{ id: string; name: string; description: string },
{ state: CombinedStateType }
>(
  'playlists/update/info',
  async ({
    id, name, description,
  }, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    try {
      await spotifyApi.changePlaylistDetails(
        id, {
          name,
          description,
        },
      );

      // Some buffer so that when that when you refresh the playlists
      // you gett the new info
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      if (e instanceof XMLHttpRequest) {
        const errorMessage = e.response && JSON.parse(
          e.response,
        )?.error?.message as undefined | string;

        if (errorMessage && errorMessage.includes('description is empty')) {
          alert('Description cannot be empty.\nThis is a limitation of Spotify.');
          // window.location.href = 'spotify:';
        } else if (errorMessage) {
          alert(errorMessage);
        } else {
          alert('Something went wrong');
        }
      } else {
        alert(e.message || 'Something went wrong');
      }
    } finally {
      await dispatch(fetchUserPlaylists(state.profile.data.id));
    }
  },
);

export const fetchUserPlaylists = createAsyncThunk<
SpotifyApi.PlaylistObjectSimplified[],
string,
{ state: CombinedStateType }
>(
  'playlists/set',
  async (userId, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const fullResponse = await getAllPages<SpotifyApi.ListOfUsersPlaylistsResponse>(
      spotifyApi.getUserPlaylists(userId, { limit: 50 }),
    );

    fullResponse.items.unshift(userLibraryPlaylist);

    return fullResponse.items;
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import chunk from 'lodash.chunk';
import shuffle from 'lodash.shuffle';
import { CombinedStateType } from '../types';
import { spotifyApi } from '../utils';
import { UserLibraryPlaylistId } from '../playlistItems/actions';

const flashPlaybackError = (e: any) => {
  alert('Please make sure you have a song already playing. This is a limitation of Spotify.');
  console.error(e);
};


export const playTrackInPlaylist = createAsyncThunk<
void,
{ trackId: string; playlistId: string },
{ state: CombinedStateType }
>('play/trackInPlaylist',
  async ({ trackId, playlistId }, { getState }) => {
    try {
      await spotifyApi.play({ uris: [`spotify:track:${trackId}`] });
    } catch (e) {
      flashPlaybackError(e);
    }
  });

export const shufflePlayPlaylist = createAsyncThunk<
void,
string,
{ state: CombinedStateType }
>('shufflePlay/playlist',
  async (playlistId, { getState }) => {
    if (playlistId === UserLibraryPlaylistId) {
      const state = getState();
      const playlistTracks = state.playlistItems.data[playlistId]?.data;

      if (playlistTracks && Object.keys(playlistTracks).length) {
        const trackIds = Object.keys(playlistTracks);
        const shuffledTrackIds = shuffle(trackIds);
        const first100Tracks = chunk(shuffledTrackIds, 100)[0];
        const trackUris = first100Tracks.map((trackId): string => `spotify:track:${trackId}`);
        try {
          await spotifyApi.play({
            uris: trackUris,
          });
        } catch (e) {
          flashPlaybackError(e);
        }
      }

      return undefined;
    }

    try {
      await spotifyApi.play({
        context_uri: `spotify:playlist:${playlistId}`,
      });
    } catch (e) {
      flashPlaybackError(e);
    }
    await spotifyApi.setShuffle(true);
    await spotifyApi.skipToNext();
    return undefined;
  });
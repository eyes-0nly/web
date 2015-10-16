import { dispatch } from '../dispatcher';
import { get, post } from '../utils/Request';

export function setPlaylists(playlists) {
  dispatch({
    type: 'playlists',
    payload: { playlists }
  });
}

export function selectPlaylist(playlistID) {
  dispatch({
    type: 'selectPlaylist',
    payload: { playlistID }
  });
}

export function setActivePlaylist(playlistID) {
  dispatch({
    type: 'setActivePlaylist',
    payload: { playlistID }
  });
}

function playlistsComplete(playlists) {
  dispatch({
    type: 'playlists',
    payload: { playlists }
  });
}

function playlistsError(err) {
  dispatch({
    type: 'playlists',
    error: true,
    payload: err
  });
}

export function loadPlaylists() {
  dispatch({ type: 'loadingPlaylists' });
  get('/v1/playlists')
    .then(res => res.json())
    .then(playlistsComplete)
    .catch(playlistsError);
}

export function createPlaylist(name) {
  const tempId = -Date.now();
  const description = '';
  const shared = false;
  dispatch({
    type: 'creatingPlaylist',
    payload: { name, description, shared },
    meta: { tempId }
  });

  post('/v1/playlists', { name, description, shared })
    .then(res => res.json())
    .then(playlist => {
      dispatch({
        type: 'createdPlaylist',
        payload: { playlist },
        meta: { tempId }
      });
    })
    .catch(error => {
      dispatch({
        type: 'createdPlaylist',
        error: true,
        payload: error,
        meta: { tempId }
      });
    });
}

export function addMedia(playlist, mediaList) {
  // POST /v1/playlists/${playlist._id}/media
  dispatch({
    type: 'addingMediaToPlaylist',
    payload: {
      playlistID: playlist._id,
      media: mediaList
    }
  });
}

export function editMedia(playlistID, media) {
  dispatch({
    type: 'showMediaEditDialog',
    payload: { playlistID, media }
  });
}

export function updateMedia(playlistID, mediaID, props) {
  dispatch({
    type: 'updateMedia',
    payload: { playlistID, mediaID, props }
  });
}

export function removeMedia(playlistID, mediaID) {
  // DELETE /v1/playlists/${playlistID}/media/${mediaID}
  dispatch({
    type: 'removeMedia',
    payload: { playlistID, mediaID }
  });
}

export function moveMedia(playlistID, medias, afterID) {
  // POST
  dispatch({
    type: 'moveMediaInPlaylist',
    payload: { playlistID, medias, after: afterID }
  });
}

export function search(query) {
  dispatch({
    action: 'searchStart',
    query
  });
  return get('/v1/search', { query })
    .then(res => res.json())
    .then(results => {
      dispatch({
        action: 'searchComplete',
        results
      });
    });
}

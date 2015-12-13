import cx from 'classnames';
import find from 'array-find';
import React, { Component, PropTypes } from 'react';
import { IDLE, LOADING, LOADED } from '../../constants/LoadingStates';
import { selectPlaylist } from '../../actions/PlaylistActionCreators';
import { search } from '../../actions/SearchActionCreators';
import PlaylistMenu from './Menu';
import PlaylistHeader from './Header';
import PlaylistPanel from './Panel';
import PlaylistPanelEmpty from './Panel/Empty';
import SearchResults from './Panel/SearchResults';

export default class PlaylistManager extends Component {
  static propTypes = {
    className: PropTypes.string,

    playlists: PropTypes.array,
    activeMedia: PropTypes.array,
    selectedMedia: PropTypes.array,

    searchSource: PropTypes.oneOf([ 'youtube', 'soundcloud' ]),
    searchQuery: PropTypes.string,
    searchResults: PropTypes.object,
    searchLoadingState: PropTypes.oneOf([ IDLE, LOADING, LOADED ]),

    onAddToPlaylist: PropTypes.func,
    onMoveToFirst: PropTypes.func,
    onEditMedia: PropTypes.func,
    onRemoveFromPlaylist: PropTypes.func
  };

  onSelectPlaylist(playlist) {
    selectPlaylist(playlist._id);
  }

  render() {
    const {
      playlists,
      selectedMedia,
      searchSource,
      searchQuery,
      searchResults,
      searchLoadingState
    } = this.props;
    const active = find(playlists, playlist => playlist.active);
    const selected = find(playlists, playlist => playlist.selected);

    const actions = {
      onAddToPlaylist: this.props.onAddToPlaylist,
      onMoveToFirst: this.props.onMoveToFirst(selected._id),
      onEditMedia: this.props.onEditMedia(selected._id),
      onRemoveFromPlaylist: this.props.onRemoveFromPlaylist(selected._id)
    };

    let panel;
    if (selected) {
      panel = (
        <PlaylistPanel
          className="PlaylistManager-panel"
          playlist={selected}
          media={selectedMedia}
          loading={!!selected.loading}
          {...actions}
        />
      );
    } else if (searchQuery) {
      panel = (
        <SearchResults
          className="PlaylistManager-panel"
          query={searchQuery}
          results={searchResults}
          loadingState={searchLoadingState}
          {...actions}
        />
      );
    } else {
      panel = <PlaylistPanelEmpty />;
    }

    return (
      <div className={cx('PlaylistManager', 'AppColumn', 'AppColumn--full', this.props.className)}>
        <PlaylistHeader
          className="PlaylistManager-header AppRow AppRow--top"
          selectedPlaylist={selected}
          searchSource={searchSource}
          onSearchSubmit={search}
        />

        <div className="AppRow AppRow--middle">
          <PlaylistMenu
            className="PlaylistManager-menu"
            playlists={playlists}
            active={active}
            selected={selected}
            searchQuery={searchQuery}
            searchResults={searchResults ? searchResults.length : 0}
            onSelectPlaylist={::this.onSelectPlaylist}
          />

          {panel}
        </div>
      </div>
    );
  }
}

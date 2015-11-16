import cx from 'classnames';
import React from 'react';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import SettingsStore from '../../stores/SettingsStore';
import listen from '../../utils/listen';
import Progress from './Progress';
import SongTitle from '../SongTitle';
import Volume from './Volume';

function getState() {
  const startTime = CurrentMediaStore.getStartTime();
  const media = CurrentMediaStore.getMedia();
  const dj = CurrentMediaStore.getDJ();
  const volume = SettingsStore.getSetting('volume');
  const muted = SettingsStore.getSetting('muted');
  return {
    startTime: startTime,
    total: media ? media.end - media.start : 0,
    media: media,
    dj: dj,
    volume: volume,
    muted: muted
  };
}

@listen(CurrentMediaStore, SettingsStore)
export default class HeaderBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string
  };

  state = getState();

  onChange() {
    this.setState(getState());
  }

  render() {
    const { title, ...props } = this.props;
    const { media, dj } = this.state;

    const nowPlaying = media
      ? <SongTitle
          artist={media.artist}
          title={media.title}
        />
      : 'Nobody is playing!';

    return (
      <div
        className={cx('HeaderBar', this.props.className)}
        {...props}
      >
        <h1 className="HeaderBar-title">{title}</h1>
        <div className="HeaderBar-now-playing">
          {nowPlaying}
        </div>
        {dj && (
          <div className="HeaderBar-dj">
            played by: {dj.username}
          </div>
        )}
        <Progress
          className="HeaderBar-progress"
          total={this.state.total}
          startTime={this.state.startTime}
        />
        <div className="HeaderBar-volume">
          <Volume
            volume={this.state.volume}
            muted={this.state.muted}
          />
        </div>
      </div>
    );
  }
}

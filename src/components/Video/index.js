import cx from 'classnames';
import isEqual from 'is-equal-shallow';
import * as React from 'react';
import screenfull from 'screenfull';

import injectMediaSources from '../../utils/injectMediaSources';

import VideoProgressBar from './VideoProgressBar';
import VideoToolbar from './VideoToolbar';

@injectMediaSources()
export default class Video extends React.Component {
  static propTypes = {
    getAllMediaSources: React.PropTypes.func.isRequired,
    isFullscreen: React.PropTypes.bool,
    enabled: React.PropTypes.bool,
    size: React.PropTypes.string,
    volume: React.PropTypes.number,
    isMuted: React.PropTypes.bool,
    media: React.PropTypes.object,
    seek: React.PropTypes.number,
    onFullscreenEnter: React.PropTypes.func.isRequired,
    onFullscreenExit: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    document.documentElement.addEventListener(
      screenfull.raw.fullscreenchange,
      this.handleFullscreenChange
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFullscreen && nextProps.isFullscreen) {
      screenfull.request(this.element);
    }
    if (this.props.isFullscreen && !nextProps.isFullscreen) {
      // Checking for `enabled` here, because our props have probably changed
      // _after_ exiting fullscreen mode (see `this.handleFullscreenChange`).
      // This way we don't double-exit.
      if (screenfull.enabled) {
        screenfull.exit();
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  handleFullscreenChange = () => {
    if (!screenfull.isFullscreen) {
      this.props.onFullscreenExit();
    }
  };

  refElement = (element) => {
    this.element = element;
  };

  render() {
    const {
      getAllMediaSources,
      isFullscreen,
      enabled,
      size,
      volume,
      isMuted,
      media,
      seek,
      onFullscreenEnter
    } = this.props;

    if (!media) {
      return <div className="Video" />;
    }

    const props = {
      enabled,
      media,
      seek,
      mode: size,
      volume: isMuted ? 0 : volume
    };

    const sources = getAllMediaSources();
    const players = Object.keys(sources).map((sourceType) => {
      if (sources[sourceType].Player) {
        const { Player } = sources[sourceType];
        return (
          <Player
            key={sourceType}
            {...props}
            active={media.sourceType === sourceType}
          />
        );
      }
      return null;
    }).filter(Boolean);

    return (
      <div
        ref={this.refElement}
        className={cx('Video', `Video--${media.sourceType}`, `Video--${size}`)}
      >
        {isFullscreen && (
          <VideoProgressBar
            media={media}
            seek={seek}
          />
        )}
        {!isFullscreen && (
          <VideoToolbar
            onFullscreen={onFullscreenEnter}
          />
        )}
        {players}
      </div>
    );
  }
}

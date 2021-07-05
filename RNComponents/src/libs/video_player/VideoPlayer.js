import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';
import PropTypes from 'prop-types';

import { GenericStyles } from '../styles';
import { COLORS } from '../colors';

import VideoProgressBar from './VideoProgressBar';
import Text from '../Text';

const getFormattedDuration = durationInSeconds => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  let formattedDuration = `${minutes}:`;
  if (seconds) {
    formattedDuration += `${seconds}`;
  } else {
    formattedDuration += '00';
  }
  return formattedDuration;
};

const playIcon = require('./play.png');
const pauseIcon = require('./pause.png');
const fullscreenIcon = require('./fullscreen.png');
const exitFullscreenIcon = require('./exit_fullscreen.png');

const VideoPlayer = props => {
  const {
    source,
    containerStyle,
    style,
    controlsContainerStyle,
    thumbnailUrl
  } = props;

  const [bufferProgressTime, setBufferProgressTime] = useState(0);
  const [activeProgressTime, setActiveProgressTime] = useState(0);

  const [duration, setDuration] = useState(0); // in seconds
  const [paused, setPaused] = useState(true);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const videoPlayer = useRef(null);

  const onLoad = data => {
    setLoading(false);
    setDuration(Math.floor(data.duration));
  };

  const onEnd = () => {
    setPaused(true);
  };

  const onProgress = data => {
    setActiveProgressTime(Math.floor(data.currentTime));
    setBufferProgressTime(Math.floor(data.playableDuration));
  };

  const onProgressBarLayout = event => {
    setProgressBarWidth(event.nativeEvent.layout.width);
  };

  const onProgressBarPress = event => {
    const { locationX } = event.nativeEvent;
    const targetTime = (locationX / progressBarWidth) * duration;
    setActiveProgressTime(Math.floor(targetTime));
    videoPlayer.current?.seek(targetTime);
  };

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const onFullscreenToggle = () => {
    if (fullscreen) {
      videoPlayer.current?.dismissFullscreenPlayer();
    } else {
      videoPlayer.current?.presentFullscreenPlayer();
    }
    setFullscreen(!fullscreen);
  };

  const onBuffer = ({ isBuffering }) => {
    setLoading(isBuffering);
  };

  const activeProgress = duration ? (activeProgressTime / duration) * 100 : 0;
  const bufferProgress = duration ? (bufferProgressTime / duration) * 100 : 0;

  return (
    <View style={[GenericStyles.fill, styles.container, containerStyle]}>
      <Video
        poster={thumbnailUrl}
        source={source}
        style={[styles.video, style]}
        resizeMode="contain"
        onLoad={onLoad}
        onProgress={onProgress}
        ref={videoPlayer}
        paused={paused}
        onEnd={onEnd}
        onBuffer={onBuffer}
        /*onError={d => console.log(d)}*/ // not working
        minLoadRetryCount={20} // not working?
      />
      <View style={[styles.absoluteFill, GenericStyles.centerAligned]}>
        {loading ? <ActivityIndicator color={'white'} size={'large'} /> : null}
      </View>
      <View
        style={[
          styles.absoluteFill,
          styles.controlsContainer,
          controlsContainerStyle
        ]}
      >
        <VideoProgressBar
          bufferProgress={bufferProgress}
          activeProgress={activeProgress}
          onPress={onProgressBarPress}
          onProgressBarLayout={onProgressBarLayout}
        />
        <View style={[GenericStyles.centerAlignedRow, GenericStyles.mt12]}>
          <TouchableOpacity onPress={onPlayPausePress}>
            <Image
              source={paused ? playIcon : pauseIcon}
              style={[GenericStyles.mr12, styles.icon]}
            />
          </TouchableOpacity>
          <Text style={GenericStyles.whiteText}>
            {`${getFormattedDuration(
              activeProgressTime
            )} / ${getFormattedDuration(duration)}`}
          </Text>
          <View style={GenericStyles.fill} />
          <TouchableOpacity onPress={onFullscreenToggle}>
            <Image
              source={fullscreen ? exitFullscreenIcon : fullscreenIcon}
              style={[GenericStyles.mr12, styles.icon]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

VideoPlayer.propTypes = {
  source: PropTypes.any,
  containerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  controlsContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  thumbnailUrl: PropTypes.string
};

VideoPlayer.defaultProps = {
  thumbnailUrl: 'https://picsum.photos/id/178/640/360'
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black'
  },
  video: {
    flex: 1
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  controlsContainer: {
    backgroundColor: COLORS.BACKGROUND.TRANSPARENT,
    padding: 12,
    justifyContent: 'flex-end'
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.BACKGROUND.WHITE
  }
});

export default VideoPlayer;

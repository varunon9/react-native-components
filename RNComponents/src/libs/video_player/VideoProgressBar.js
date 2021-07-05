import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const progressBarColors = {
  background: '#5b5852',
  buffer: '#b1b1b0',
  active: '#ffffff'
};

const VideoProgressBar = props => {
  const {
    progressBarColors,
    bufferProgress,
    activeProgress,
    onPress,
    onProgressBarLayout
  } = props;

  const backgroundStyle = {
    backgroundColor: progressBarColors.background
  };

  const bufferProgressStyle = {
    backgroundColor: progressBarColors.buffer,
    width: `${bufferProgress}%`
  };

  const activeProgressStyle = {
    backgroundColor: progressBarColors.active,
    width: `${activeProgress}%`
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[styles.container, styles.br4, backgroundStyle]}
        onLayout={onProgressBarLayout}
      >
        <View style={[styles.absoluteFill, styles.br4, bufferProgressStyle]} />
        <View style={[styles.absoluteFill, styles.br4, activeProgressStyle]} />
      </View>
    </TouchableWithoutFeedback>
  );
};

VideoProgressBar.propTypes = {
  progressBarColors: PropTypes.shape({
    background: PropTypes.string,
    buffer: PropTypes.string,
    active: PropTypes.string
  }),
  bufferProgress: PropTypes.number,
  activeProgress: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  onProgressBarLayout: PropTypes.func.isRequired
};

VideoProgressBar.defaultProps = {
  progressBarColors
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 6,
    overflow: 'hidden'
  },
  br4: {
    borderRadius: 4
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
  }
});

export default VideoProgressBar;

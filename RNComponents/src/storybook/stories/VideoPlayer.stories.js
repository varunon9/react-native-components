import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { VideoPlayer } from '../../libs';

const Template = props => {
  return (
    <VideoPlayer
      source={{
        uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      }}
      {...props}
    />
  );
};

storiesOf('VideoPlayer', module).add('basic', () => <Template />);

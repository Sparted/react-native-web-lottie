import React from 'react';
import { Animated, Button } from "react-native";

import Animation from 'lottie-react-native';

import { storiesOf } from '@storybook/react';

const AnimationWithProgress = () => {
  // Only Animated.Value is supported
  // Animation Value must go from 0 to 1
  let progress = new Animated.Value(0);

  return (
    <>
      <Animation source={require('./assets/gift.json')} progress={progress} />

      <Button
        title='Play using sequence (2000ms)'
        onPress={() => {
          progress.setValue(0);

          Animated.sequence([
            Animated.timing(progress, {
              toValue: 1,
              duration: 2000,
            }),
          ]).start();
        }}
      />

      <Button
        title='>>'
        color="#f194ff"
        onPress={() => {
          progress.setValue(progress.__getValue() + 0.05);
        }}
      />

      <Button
        title='<<'
        color="#f194ff"
        onPress={() => {
          progress.setValue(progress.__getValue() - 0.05);
        }}
      />

      <Button
        title='Go to 50%'
        onPress={() => {
          progress.setValue(0.50);
        }}
      />
    </>
  )
}

// Gift animation by Jan Semler https://www.lottiefiles.com/u/141
storiesOf('Lottie', module)
  .add('basic', () => <Animation source={require('./assets/gift.json')} autoPlay />)
  .add('loop', () => <Animation source={require('./assets/gift.json')} loop autoPlay />)
  .add('progress', () => <AnimationWithProgress />);

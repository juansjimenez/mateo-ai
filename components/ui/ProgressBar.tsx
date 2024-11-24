import { View, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export enum size {
  small = 10,
  big = 20,
}
const styles = StyleSheet.create({
  progressContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: '#ecedec',
  },

  progressBar: {
    width: '20%',
    backgroundColor: '#93c47d',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  progress: {
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#d6facf',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '20%',
    position: 'absolute'

  },
});

type Props = PropsWithChildren<{
  barsize: size;
}>;

export function ProgressBar({ barsize }: Props) {
  return (
    <View
      className="flex flex-row pb-10"
      style={[styles.progressContainer, { height: barsize }]}
    >
      <LinearGradient
          className="rounded-lg"
          colors={['#38FA18', 'transparent']}
          style={[styles.progress, { height: barsize-2 }]}
          start={[0, 1]}
          end={[1, 0]}
        />
    </View>
  );
}

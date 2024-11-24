import { View, StyleSheet, Text } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export enum size {
  small = 10,
  big = 20,
}
const styles = StyleSheet.create({
  progressContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center', 
  },
  numerito: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  progress: {
    left: 0,
    right: 0,
    top: 0,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#d6facf',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    position: 'absolute',
    marginRight: 10,
  },
});

type Props = PropsWithChildren<{
  barsize: size;
  percentage: number;
}>;

export function ProgressBar({ barsize, percentage }: Props) {
  return (
    <View
      className="flex flex-row pb-10"
      style={[styles.progressContainer, { height: barsize }]}
    >
      <LinearGradient
          className="rounded-lg"
          colors={['#38FA18', 'transparent']}
          style={[styles.progress, { height: barsize-2, width: `${percentage}%` }]}
          start={[0, 1]}
          end={[1, 0]}
        />
      <Text style={styles.numerito}>{`${Number(percentage)} %`}</Text>
    </View>
  );
}

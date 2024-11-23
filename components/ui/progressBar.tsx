import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 30,
    width: 100
  },
});

export function ProgressBar(progress: StyleSheet){
  return(
      <View className="flex flex-row pb-10">
        <LinearGradient
          className="rounded-lg"
          colors={['#38FA18', 'transparent']}
          style={styles.progress}
          start={[0, 1]}
          end={[1, 0]}
        />
      </View>
  )
}
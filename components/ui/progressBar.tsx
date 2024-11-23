import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  progress: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 22,
    width: 100,
    borderRadius: 10,
    borderColor: '#0AFFF0',
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 5,
  },
});

function ProgressBar(){
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

export default ProgressBar;
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  progressContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 10,
    width: '100%',
    borderRadius: 5,
    borderColor: '#0AFFF0',
    borderWidth: 2,
    marginBottom: 5,
    backgroundColor: '#ecedec',
    marginTop: 10,
  },
  progressBar: {
    width: '30%',
    backgroundColor: '#93c47d',
    height: 8,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

function ProgressBar() {
  return (
    <View className="flex flex-row pb-10" style={styles.progressContainer}>
      <View className="rounded-lg" style={styles.progressBar} />
    </View>
  );
}

export default ProgressBar;

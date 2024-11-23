import { View, Image,StyleSheet, Text, ImageSourcePropType } from 'react-native';
import { ProgressBar } from '../../components'

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  stretch: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  contentRow: {
    flex: 1,
    backgroundColor: '#rgba(255, 170, 35, 0.3)', 
    top: 20,
    content: 'center',
  },
  contentRowText: {
    fontSize: 20,
    color: 'black',
    height: 50,
    paddingLeft: 20,
    paddingTop: 10,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

function moduleCard(source: ImageSourcePropType | undefined){
  return(
  
    <View>
      <View >
        <ProgressBar
        />
      </View>
      <View>
        <Image
          style={styles.stretch}
          source={source}
        />
      </View>
    </View>
  )
}

export default function LandingDashboard() {
  return (
    <View>
      <View 
        style={styles.contentRow}>
          <Text
            style={styles.contentRowText}
          >
            Asignaturas
          </Text>
        </View>
      <View style={styles.container}>

          <View className='container' >
          {moduleCard(require("../../assets/images/modules/modulo1.png"))}
          </View>

      </View>
    </View>
  );
}
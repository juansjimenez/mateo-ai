import {
  ImageSourcePropType,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { ProgressBar, size } from '@/components';
import React from 'react';
function moduleCard(source: ImageSourcePropType | undefined, title: string) {
  return (
    <View style={styles.asignaturaContainer}>
        <ProgressBar barsize={size.small} />
        <Image style={styles.stretch} source={source} />
        <Text>{title}</Text>
    </View>
  );
}

function LandingDashboard() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Asignaturas</Text>
      </View>
      <View style={styles.subjects}>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/math-subjects/numeros.png'), 'Numeros')}
        </View>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/math-subjects/algebra.png'), 'Algebra')}
        </View>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/math-subjects/geometry.png'), 'Probabilidad')}
        </View>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/math-subjects/probabilidad.png'), 'Estadística')}
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>
      <LandingDashboard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    gap: 8,
    marginBottom: 8,
    padding: 20,
    backgroundColor: 'red',
    height: '100%',
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'white',
    top: 20,
    marginRight: -20,
    marginLeft: -20,
  },
  asignaturaContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  stretch: {
    width: '100%',
    height: 100,
  },
  text: {
    fontSize: 20,
    color: 'black',
    height: 50,
    paddingLeft: 20,
    paddingTop: 10,
  },
  subjects: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  subjectItem: {
    margin: 10,
    width: '100%',
  },
});

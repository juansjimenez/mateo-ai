import { ImageSourcePropType, Text, StyleSheet, View, Image } from 'react-native';
import { ProgressBar } from '@/components';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

function moduleCard(source: ImageSourcePropType | undefined) {
  return (
    <View>
      <View>
        <ProgressBar />
      </View>
      <View>
        <Image style={styles.stretch} source={source} />
      </View>
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
          {moduleCard(require('../../assets/images/modules/modulo1.png'))}
        </View>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/modules/modulo2.png'))}
        </View>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/modules/modulo3.png'))}
        </View>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/modules/modulo4.png'))}
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
    gap: 8,
    marginBottom: 8,
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  stretch: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'white',
    top: 20,
  },
  text: {
    fontSize: 20,
    color: 'black',
    height: 50,
    paddingLeft: 20,
    paddingTop: 10,
  },
  subjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  subjectItem: {
    margin: 10,
  },
});

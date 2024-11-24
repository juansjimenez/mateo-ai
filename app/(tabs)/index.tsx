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
        
        <Image style={styles.stretch} source={source} />
        <Text style={styles.asignaturaTitle}>{title}</Text>
        <View style={styles.barContainer}>
        <ProgressBar barsize={size.small} percentage={80} />
        </View>
    </View>
  );
}

function MainContainer({ children }: { children: React.ReactNode }) {
  return <View style={styles.mainContainer}>{children}</View>;
}

function Header(title: string) {
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.headerIcon} source={require('../../assets/images/mateo-icon.png')} />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

function LandingDashboard() {
  return (
    <View style={styles.mainContainer}>
      {Header('Asignaturas')}
      <View style={styles.subjects}>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/math-subjects/numeros.png'), 'Números')}
        </View>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/math-subjects/algebra.png'), 'Álgebra')}
        </View>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/math-subjects/geometry.png'), 'Geometría')}
        </View>
        <View style={styles.subjectItem}>
          {moduleCard(require('../../assets/images/math-subjects/probabilidad.png'), 'Probabilidad')}
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 4,
    marginBottom: 10,
    marginRight: -20,
    marginLeft: -20,
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
  },
  headerText: {
    fontSize: 30,
    color: 'black',
  },
  headerIcon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 5,
  },
  mainContainer: {
    display: 'flex',
    gap: 0,
    padding: 20,
    paddingTop: 20,
    backgroundColor: 'white'
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'white',
    top: 20,
  },
  asignaturaContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
    // gap: 10
  },
  stretch: {
    width: '100%',
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  asignaturaTitle: {
    fontSize: 25,
    padding: 8,
  },
  barContainer: {
    padding: 8,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  subjectItem: {
    margin: 10,
    width: '100%',
  },
});


export { Header, MainContainer }
import { HelloWave } from '@/components/HelloWave';
import { ThemedView } from '@/components/ThemedView';
import { ImageSourcePropType, Pressable, Text, StyleSheet, View, Image } from 'react-native';
import { Card } from 'react-native-paper'
import { ProgressBar, AlternativeSelection } from '@/components';
import React, { PropsWithChildren, useState } from 'react';
import {loremImpsum} from '@/assets/loremipsum'
import ChatModal from '../../components/ChatModal';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';

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

function LandingDashboard() {
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

export default function HomeScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>

      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Asignaturas</ThemedText>
          {LandingDashboard()}
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
home:{
height: '100%'
},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#0078fe',
    width: '10%',
    marginLeft:'auto',
    marginTop:'auto'
  },
 textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
  }
});
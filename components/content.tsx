import { StyleSheet, View, Text } from 'react-native';
import { ProgressBar, size } from '@/components';
import React, { useState } from 'react';
import { Header, MainContainer } from '@/app/(tabs)';

function Content(title: string) {
  return (
    <View style={styles.asignaturaContainer} key={title}>
        <Text style={styles.asignaturaTitle}>{title}</Text>
        <View style={styles.barContainer}>
        <ProgressBar barsize={size.small} percentage={80} />
        </View>
    </View>
  );
}

export default function Contents() {
  const [contents, setContent] = useState(['This is the content', 'Content-b']);

  let contentsView = [];
  for (let contentIdx in contents) {
    let content = contents[contentIdx];
    contentsView.push(Content(content));
  }
  return (
    <MainContainer>
      {Header('Contenidos')}
      <View style={styles.contenidosContainer}>
        {contentsView}
      </View>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  contenidosContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    margin: 0,
    gap: 20,
  },
  asignaturaContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
  },
  asignaturaTitle: {
    fontSize: 25,
    padding: 8,
  },
  barContainer: {
    padding: 8,
  },
});
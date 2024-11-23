import { ImageSourcePropType, Text, StyleSheet, Theme, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { MyButton, AssignmentCard } from '@/components';
import React, { PropsWithChildren, useState } from 'react';
import { loremImpsum } from '@/assets/loremipsum';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <ParallaxScrollView>
      <AssignmentCard
        placeholderImageSource={require('../../assets/images/excercise/ejercicio.png')}
        hasProgress={true}
        cardTitle={'Ecuaciones Simples'}
      >
        <View style={styles.buttonContainer}></View>
      </AssignmentCard>
    </ParallaxScrollView>
  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    buttonContainer: {
      alignContent: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    exerciseimage: {
      boxSizing: 'fit',
    },
  });
};

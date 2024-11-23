import { ImageSourcePropType, Text, StyleSheet, Theme, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ProgressBar, MyButton, AssignmentCard } from '@/components';
import React, { PropsWithChildren, useState } from 'react';
import { loremImpsum } from '@/assets/loremipsum';
import ParallaxScrollView from '@/components/ParallaxScrollView';


export default function Assignment() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const theme = useTheme();
  const styles = makeStyles(theme)
  const handleChatVisibility = () => {
    setChatVisibility(!chatVisibility);
  };

  return (
    <ParallaxScrollView>
      <AssignmentCard
        placeholderImageSource={require('../../assets/images/excercise/ejercicio.png')}
        taskStatement={loremImpsum}
        hasProgress ={true}>
        
            <View style={styles.buttonContainer}>
          <MyButton> Aprender </MyButton>
        </View>
        </AssignmentCard>
    </ParallaxScrollView>
  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    home: {
      height: '100%',
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

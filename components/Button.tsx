import { ImageSourcePropType, Pressable, Text, StyleSheet } from 'react-native';
import { Card, Button, useTheme } from 'react-native-paper';

import React, { PropsWithChildren, useState } from 'react';

export function MyButton() {
  const [buttonClicked, setButtonOnClick] = useState(false);
  const handleButtonClick = () => {
    setButtonOnClick(!buttonClicked);
  };
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Button
      style={[
        styles.button,
        buttonClicked ? styles.buttonSecondaryColor : styles.buttonColor,
      ]}
      onPress={() => handleButtonClick()}
      
    >
      {' '}
      Aprender{' '}
    </Button>
  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      width: '10%',
      marginTop: 10,
      color: 'white',
      flexDirection: 'row',
    },
    buttonColor: {
      backgroundColor: theme.colors.clickable,
    },
    buttonSecondaryColor: {
      backgroundColor: theme.colors.clickablehover,
    },
  });
};

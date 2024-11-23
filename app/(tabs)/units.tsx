import { ImageSourcePropType, Text, StyleSheet, Theme, View } from 'react-native';
import { Card, Button, useTheme } from 'react-native-paper';
import { ProgressBar } from '@/components';
import React, { PropsWithChildren, useState } from 'react';
import { loremImpsum } from '@/assets/loremipsum';
import ParallaxScrollView from '@/components/ParallaxScrollView';

type Props = PropsWithChildren<{
  placeholderImageSource: ImageSourcePropType | undefined;
  taskStatement: string;
}>;

function AssignmentCard({ children, placeholderImageSource, taskStatement }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Card>
      <ProgressBar />
      <Card.Cover source={placeholderImageSource} />
      <Card.Title title="Card Title" />
      <Card.Content>
        <Text> {taskStatement} </Text>
      </Card.Content>
      <View style={styles.buttonContainer}>
        <Button style={styles.button}> Aprender </Button>

      </View>
    </Card>
  );
}

export default function Assignment() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const theme = useTheme();
  const handleChatVisibility = () => {
    setChatVisibility(!chatVisibility);
  };

  return (
    <ParallaxScrollView>
      <AssignmentCard
        placeholderImageSource={require('../../assets/images/excercise/ejercicio.png')}
        taskStatement={loremImpsum}
      />
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
      alignContent: 'center'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: theme.colors.clickable,
      width: '50%',
      margin: 20,
      fontColor: 'white',
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

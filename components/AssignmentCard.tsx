import { ImageSourcePropType, Text, StyleSheet, Theme, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ProgressBar, MyButton } from '@/components';
import React, { PropsWithChildren, useState } from 'react';


type Props = PropsWithChildren<{
  placeholderImageSource: ImageSourcePropType | undefined;
  taskStatement: string;
  hasProgress: boolean

}>;

export default function AssignmentCard({ children, placeholderImageSource, taskStatement, hasProgress }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Card>
        {hasProgress&&<ProgressBar />}
      <Card.Cover source={placeholderImageSource} />
      <Card.Title title="Card Title" />
      <Card.Content>
        <Text> {taskStatement} </Text>
      </Card.Content>
      <View style={styles.buttonContainer}>
        {children}
      </View>
    </Card>
  );
}


const makeStyles = (theme: Theme) => {
  return StyleSheet.create({

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

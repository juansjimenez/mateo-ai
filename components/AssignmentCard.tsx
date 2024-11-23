import { ImageSourcePropType, Text, StyleSheet, Theme, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ProgressBar, MyButton } from '@/components';
import React, { PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren<{
  placeholderImageSource?: ImageSourcePropType;
  taskStatement?: string;
  cardTitle?: string;
  hasProgress: boolean;
}>;

export default function AssignmentCard({
  children,
  placeholderImageSource,
  taskStatement,
  hasProgress,
  cardTitle,
}: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Card>
      {hasProgress && <ProgressBar />}
      {placeholderImageSource && <Card.Cover source={placeholderImageSource} />}
      <Card.Title title={cardTitle} />
      {taskStatement && (
        <Card.Content>
          <Text> {taskStatement} </Text>
        </Card.Content>
      )}
      <View style={styles.buttonContainer}>{children}</View>
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

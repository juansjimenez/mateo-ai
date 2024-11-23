import { ImageSourcePropType, Text, StyleSheet, Theme, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ProgressBar, size } from '@/components';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  placeholderImageSource?: ImageSourcePropType;
  taskStatement?: string;
  cardTitle?: string;
  hasProgress: boolean;
  progressSize?: size;
}>;

export default function AssignmentCard({
  children,
  placeholderImageSource,
  taskStatement,
  hasProgress,
  cardTitle,
  progressSize,
}: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Card>
      {hasProgress && progressSize && <ProgressBar barsize={progressSize} />}
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

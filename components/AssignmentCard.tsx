import { ImageSourcePropType, Text, StyleSheet, Theme, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ProgressBar, size } from '@/components';
import React, { PropsWithChildren } from 'react';
import Markdown from 'react-native-markdown-display';

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
          <Markdown style={styles.markdown}>{taskStatement}</Markdown>
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
    markdown: {
      body: {
        fontSize: 16,
        lineHeight: 24,
      },
      heading1: {
        fontSize: 24,
        marginBottom: 10,
      },
      code: {
        fontSize: 14,
        backgroundColor: '#f4f4f4',
        padding: 5,
        borderRadius: 4,
      },
    },
  });
};

import { StyleSheet, Theme, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import React, { PropsWithChildren } from 'react';
import MarkdownView from './Markdown';

type Props = PropsWithChildren<{
  taskStatement?: string;
}>;

export default function AssignmentCard({
  children,
  taskStatement,
}: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.exerciseContainer}>
      <View style={styles.statementContainer}>
        <MarkdownView taskStatement={taskStatement} />
      </View>
      <View style={styles.buttonContainer}>{children}</View>
    </View>

  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    buttonContainer: {
      alignContent: 'center',
      justifyContent: 'center',
    },
    exerciseContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 10,
      margin: 0,
    },
    statementContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
};

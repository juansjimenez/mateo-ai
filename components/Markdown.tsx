import { StyleSheet, Theme } from 'react-native';
import { useTheme } from 'react-native-paper';
import React, { PropsWithChildren } from 'react';
import Markdown from 'react-native-markdown-display';

type Props = PropsWithChildren<{
  taskStatement?: string;
  fontColor?: string;
  fontSize?: string;
}>;

export default function MarkdownView({ taskStatement, fontColor, fontSize }: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme, fontColor, fontSize);
  return <Markdown style={styles.markdown}>{taskStatement}</Markdown>;
}

const makeStyles = (theme: Theme, fontColor: string, fontSize: number) => {
  return StyleSheet.create({
    markdown: {
      body: {
        fontSize,
        lineHeight: 24,
        color: fontColor,
      },
      heading1: {
        fontSize: 24,
        marginBottom: 10,
      },
      code: {
        fontSize: 14,
        padding: 5,
        borderRadius: 4,
      },
    },
  });
};

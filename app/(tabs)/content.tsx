import { ImageSourcePropType, Text, StyleSheet, Theme, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { AssignmentCard, size } from '@/components';
import React, { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';

function Content(styles: StyleSheet, content: string) {
  return (
    <ParallaxScrollView>
      <AssignmentCard cardTitle={content} hasProgress={true} progressSize={size.big}>
        <View style={styles.buttonContainer}></View>
      </AssignmentCard>
    </ParallaxScrollView>
  );
}

export default function MakeContents() {
  const [contents, setContent] = useState(['This is the content']);
  const theme = useTheme();
  const styles = makeStyles(theme);
  let contentsView = [];
  for (let contentIdx in contents) {
    let content = contents[contentIdx];
    contentsView.push(Content(styles, content));
  }
  return contentsView;
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

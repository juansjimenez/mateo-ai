import { StyleSheet, Theme, View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { AssignmentCard, size } from '@/components';
import React, { useState } from 'react';

function Content(styles: StyleSheet, content: string) {
  return (
    <ScrollView>
      <AssignmentCard cardTitle={content} hasProgress={true} progressSize={size.big}>
        <View style={styles.buttonContainer}></View>
      </AssignmentCard>
    </ScrollView>
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

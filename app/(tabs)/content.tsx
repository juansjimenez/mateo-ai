import { StyleSheet, Theme, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { AssignmentCard } from '@/components';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

function Content(styles: StyleSheet, content: string) {
  return (
  <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>
      <AssignmentCard cardTitle={content} hasProgress={true}>
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

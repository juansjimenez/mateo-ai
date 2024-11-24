import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ProgressBar, size } from '@/components';
import React from 'react';
import Task from '@/components/task';
import { Header, MainContainer } from '@/app/(tabs)';

function Content({ title }: { title: string }) {
  return (
    <View style={styles.asignaturaContainer} key={title}>
      <Text style={styles.asignaturaTitle}>{title}</Text>
      <View style={styles.barContainer}>
        <ProgressBar barsize={size.small} percentage={80} />
      </View>
    </View>
  );
}

export default function Contents({ contents, subjectId, resetLanding }: { contents: string[], subjectId: string, resetLanding: () => void }) {
  const [showQuestion, setShowQuestion] = React.useState(false);
  const [unitId, setUnitId] = React.useState('');

  return (
    showQuestion ? <Task resetLanding={resetLanding} subjectId={subjectId} unitId={unitId} /> :
    <MainContainer>
      {Header('Contenidos')}
      <View style={styles.contenidosContainer}>
        {contents.map((content) => (
          <Pressable key={content} onPress={() => {setShowQuestion(true); setUnitId(content);}}>
            <Content key={content} title={content} />
          </Pressable>
        ))}
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  contenidosContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    margin: 0,
    gap: 20,
  },
  asignaturaContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
  },
  asignaturaTitle: {
    fontSize: 25,
    padding: 8,
  },
  barContainer: {
    padding: 8,
  },
});

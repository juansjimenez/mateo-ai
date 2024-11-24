import { StyleSheet, Theme, ScrollView } from 'react-native';
import { AssignmentCard, size } from '@/components';
import React, { useState } from 'react';

function Unit(assignmentTitle: string) {
  return (
    <AssignmentCard
      placeholderImageSource={require('../assets/images/excercise/ejercicio.png')}
      hasProgress={true}
      progressSize={size.big}
      cardTitle={assignmentTitle}
    ></AssignmentCard>
  );
}

export default function Units() {
  const [assignments, setAssignments] = useState(['Ecuaciones Simples']);
  let assignmentsView = [];
  for (let assignmentIdx in assignments) {
    let assignment = assignments[assignmentIdx];
    assignmentsView.push(Unit(assignment));
  }
  return (
    <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>
      {assignmentsView}
    </ScrollView>
  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    buttonContainer: {
      alignContent: 'center',
      justifyContent: 'center',
    },
  });
};

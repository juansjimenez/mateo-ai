import { StyleSheet, Theme } from 'react-native';
import { AssignmentCard } from '@/components';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

function Assignment(assignmentTitle: string) {
  return (
    <AssignmentCard
      placeholderImageSource={require('../../assets/images/excercise/ejercicio.png')}
      hasProgress={true}
      cardTitle={assignmentTitle}
    ></AssignmentCard>
  );
}

export default function Assignments() {
  const [assignments, setAssignments] = useState(['Ecuaciones Simples']);
  let assignmentsView = [];
  for (let assignmentIdx in assignments) {
    let assignment = assignments[assignmentIdx];
    assignmentsView.push(Assignment(assignment));
  }
  return  <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>{assignmentsView}</ScrollView>;
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    buttonContainer: {
      alignContent: 'center',
      justifyContent: 'center',
    },
  });
};
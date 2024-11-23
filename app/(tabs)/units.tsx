import { StyleSheet, Theme } from 'react-native';
import { AssignmentCard, size } from '@/components';
import React, { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';

function Assignment(assignmentTitle: string) {
  return (
    <AssignmentCard
      placeholderImageSource={require('../../assets/images/excercise/ejercicio.png')}
      hasProgress={true}
      progressSize={size.big}
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
  return <ParallaxScrollView>{assignmentsView}</ParallaxScrollView>;
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    buttonContainer: {
      alignContent: 'center',
      justifyContent: 'center',
    },
  });
};

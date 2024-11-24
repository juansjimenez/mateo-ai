import { Svg, Polygon } from 'react-native-svg';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';

import { RadarChart } from '@salmonco/react-native-radar-chart';

const spiderChart = () => {
  const data = [
    { label: 'Números', value: 30 },
    { label: 'Álgebra', value: 55 },
    { label: 'Probabilidad', value: 70 },
    { label: 'Geometría', value: 35 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <RadarChart
        data={data}
        maxValue={100}
        gradientColor={{
          startColor: '#FF9432',
          endColor: '#FFF8F1',
          count: 5,
        }}
        stroke={['#FFE8D3', '#FFE8D3', '#FFE8D3', '#FFE8D3', '#ff9532']}
        strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
        strokeOpacity={[1, 1, 1, 1, 0.13]}
        labelColor="#433D3A"
        dataFillColor="#FF9432"
        dataFillOpacity={0.8}
        dataStroke="salmon"
        dataStrokeWidth={2}
        isCircle
      />
    </SafeAreaView>
  );
};

function Hexagon() {
  return (
    <Svg height="300" width="300">
      <Polygon
        points="00,150 225,280 75,280 0,150 75,20 225,20 300,150 225,280"
        stroke="black"
        fill="white"
        strokeWidth="1"
      ></Polygon>
    </Svg>
  );
}
type strength = {
  name: string;
  points: number;
};
const dummyStrength: strength[] = [
  {
    name: 'Probabilidad',
    points: 4,
  },
  {
    name: 'Geometría',
    points: 3,
  },
  {
    name: 'Álgebra',
    points: 2,
  },
  {
    name: 'Números',
    points: 1
  }
];

function strengthView(points: number, name: string) {
  return (
    <View style={styles.box}>
      <View style={[styles.statContainer]}>
        <View style={[styles.statRow, { width: 100 * points }]}>{name}</View>
      </View>
    </View>
  );
}
function listOfStregths() {
  const [strengths, listOfStregth] = useState(dummyStrength);
  let stregthsView = [];
  for (let strengthIdx in strengths) {
    const strength = strengths[strengthIdx];
    stregthsView.push(strengthView(strength.points, strength.name));
  }
  return stregthsView;
}
export default function userStats() {
  return (
    <View>
      {spiderChart()}
      {listOfStregths()}
    </View>
  );
}

const styles = StyleSheet.create({
  statRow: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#20c997',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    color: 'white'
  },
  statContainer: {
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    marginLeft: '30%',
  }

});

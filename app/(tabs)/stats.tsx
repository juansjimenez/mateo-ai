import { View, ScrollView, StyleSheet, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header, MainContainer } from './';
import { Svg, Polygon } from 'react-native-svg';

import { RadarChart } from '@salmonco/react-native-radar-chart';
import Server from '@/server/server';
import { ProgressBar, size } from '@/components';

interface UnitData {
  unitId: string;
  accuracy: number;
}

interface SubjectData {
  subjectId: string;
  accuracy: number;
}

interface Strength {
  subject: SubjectData[];
  units: UnitData[];
}

interface HistoryAnalysis {
  globalAccuracy: number;
  strengths: Strength;
  weaknesses: {
    subject: SubjectData[];
    units: UnitData[];
  };
}

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

const dummyStrength: Strength = {
  subject: [],
  units: [
    {
      unitId: 'Dummy Name',
      accuracy: 2,
    },
    {
      unitId: 'Dummy Name',
      accuracy: 3,
    },
    {
      unitId: 'Dummy Name',
      accuracy: 4,
    },
  ],
};

function strengthView(points: number, name: string) {
  return (
    <View style={[styles.statContainer]} key={`${name}-${points}`}>
      <Text>{name}</Text>
      <ProgressBar barsize={size.big} percentage={Number((100 * points).toFixed(0))} />
    </View>
  );
}
function listOfStrength(strengths: Strength) {
  let strengthsView = [];
  for (let index in strengths.units) {
    const unit = strengths.units[index];
    strengthsView.push(strengthView(unit.accuracy, unit.unitId));
  }
  return strengthsView;
}
export default function Stats() {
  const profileIdentifier = 'ee654115-aa6a-4710-902f-73813ca55bd6';
  const [strengths, setStrengths] = useState(dummyStrength);
  const [weaknesses, setWeaknesses] = useState(dummyStrength);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getQuestion = async () => {
      const response = await Server.get(
        `/personalized-exercises/history/${profileIdentifier}`,
      );
      console.log('responsseeeee,', JSON.stringify(response));
      if (response && response.historyAnalysis) {
        setStrengths(response.historyAnalysis.strengths);
        setWeaknesses(response.historyAnalysis.weaknesses);
      }
      setIsLoading(false);
    };
    getQuestion();
  }, []);

  return (
    <MainContainer style={styles.padding}>
      {Header('Avances')}
      {isLoading
        ? <ActivityIndicator size="large" color="#00ff00" />
        : (
          <ScrollView>
            {spiderChart()}
            <Text style={styles.title}>Debilidades</Text>
            {listOfStrength(strengths)}
            <Text style={styles.title}>Fortalezas</Text>
            {listOfStrength(weaknesses)}
          </ScrollView>
        )
      }
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 10,
  },
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
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    marginLeft: '30%',
  },
  padding: {
    paddingLeft: 30,
    paddingRight: 30,
  },
});

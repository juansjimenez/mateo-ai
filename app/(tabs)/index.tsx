import {
  ImageSourcePropType,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { ProgressBar, size } from '@/components';
import React, { useEffect, useState } from 'react';
import { allSubjects } from '@/assets/all-subjects';
import Contents from '@/components/content';

function moduleCard(source: ImageSourcePropType | undefined, title: string) {
  return (
    <View style={styles.asignaturaContainer} key={title}>
      <Image style={styles.stretch} source={source} />
      <Text style={styles.asignaturaTitle}>{title}</Text>
      <View style={styles.barContainer}>
        <ProgressBar barsize={size.small} percentage={80} />
      </View>
    </View>
  );
}

function MainContainer({ children }: { children: React.ReactNode }) {
  return <ScrollView style={styles.mainContainer}>{children}</ScrollView>;
}

function Header(title: string) {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.headerIcon}
        source={require('../../assets/images/mateo-icon.png')}
      />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}
type modulesStruct = {
  image: NodeRequire;
  subjectId: string;
  units: { unitId: string }[];
};

function BuildModule(module: modulesStruct, handleChatVisibility: (contentsIds: string[], subjectId: string) => void) {
  return (
    <Pressable key={module.subjectId} style={{ width: '95%' }}  onPress={() => handleChatVisibility(module.units.map(s => s.unitId), module.subjectId)}>
      <View style={styles.subjectItem}>{moduleCard(module.image, module.subjectId)}</View>
    </Pressable>
  );
}

function listOfModules(setContents: (contentsIds: string[], subjectId: string) => void) {
  let modulesView = [];
  for (let moduleIdx in allSubjects) {
    const module = allSubjects[moduleIdx];
    modulesView.push(BuildModule(module, setContents));
  }
  return modulesView;
}

function LandingDashboard() {
  const [showUnits, setShowUnits] = useState(true);
  const [contents, setContents] = useState([] as string[]);
  const [currentSubject, setCurrentSubject] = useState('');

  const handleChatVisibility = (contentsIds: string[], subjectId: string) => {
    setShowUnits(!showUnits);
    console.log(contentsIds);
    setContents(contentsIds);
    setCurrentSubject(subjectId);
  };

  useEffect(() => {
    setShowUnits(true);
    setContents([]);
    setCurrentSubject('');
  }, []);

  return (
    <View>
      {showUnits ? (
        <View style={styles.mainContainer}>
          {Header('Unidades')}
          <View style={styles.subjects}>{listOfModules(handleChatVisibility)}</View>
        </View>
      ) : (
        <Contents contents={contents} subjectId={currentSubject} />
      )}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>
      <LandingDashboard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 4,
    marginBottom: 10,
    marginRight: -20,
    marginLeft: -20,
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
  },
  headerText: {
    fontSize: 30,
    color: 'black',
  },
  headerIcon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 5,
  },
  mainContainer: {
    display: 'flex',
    gap: 0,
    padding: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    height: '100%',
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'white',
    top: 20,
  },
  asignaturaContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
    // gap: 10
  },
  stretch: {
    width: '100%',
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  asignaturaTitle: {
    fontSize: 25,
    padding: 8,
  },
  barContainer: {
    padding: 8,
  },
  text: {
    fontSize: 20,
    color: 'black',
    height: 50,
    paddingLeft: 20,
    paddingTop: 10,
  },
  subjects: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  subjectItem: {
    margin: 10,
    width: '100%',
  },
});

export { Header, MainContainer };

import { ImageSourcePropType, Pressable, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { ProgressBar } from '@/components';
import React, { PropsWithChildren, useState } from 'react';
import { loremImpsum } from '@/assets/loremipsum';
import ParallaxScrollView from '@/components/ParallaxScrollView';

type Props = PropsWithChildren<{
  placeholderImageSource: ImageSourcePropType | undefined;
  taskStatement: string;
}>;

function AssignmentCard({ children, placeholderImageSource, taskStatement }: Props) {
  return (
    <Card>
      <ProgressBar />
      <Card.Cover source={placeholderImageSource} />
      <Card.Title title="Card Title" />
      <Card.Content>
        <Text> {taskStatement} </Text>
      </Card.Content>
    </Card>
  );
}

export default function Assignment() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [actualQuestion, setActualQuestion] = useState('');
  const handleChatVisibility = () => {
    setChatVisibility(!chatVisibility);
  };

  return (
    <ParallaxScrollView>
      <AssignmentCard
        placeholderImageSource={require('../../assets/images/excercise/ejercicio.png')}
        taskStatement={loremImpsum}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#0078fe',
    width: '10%',
    marginLeft: 'auto',
    marginTop: 'auto',
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

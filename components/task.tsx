import { ImageSourcePropType, Pressable, View, StyleSheet } from 'react-native';
import { AlternativeSelection, AssignmentCard } from '@/components';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { loremImpsum } from '@/assets/loremipsum';
import { ThemedText } from '@/components/ThemedText';
import ChatModal from '@/components/ChatModal';
import { Header, MainContainer } from '@/app/(tabs)';
import Server from '@/server/server';

type Props = PropsWithChildren<{
  placeholderImageSource: ImageSourcePropType | undefined;
  taskStatement: string;
}>;

interface Alternative {
  index: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  statement: string;
  identifier: string;
  alternatives: Alternative[];
}

export default function Task() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [actualQuestion, setActualQuestion] = useState({
    statement: loremImpsum,
    alternatives: [
      {
        index: 1,
        text: '1/2',
      },
      {
        index: 2,
        text: '10/26',
      },
      {
        index: 3,
        text: '1/3',
      },
      {
        index: 4,
        text: '2/9',
      },
    ],
  } as Question);
  const [selectedAlternative, setSelectedAlternative] = useState('');

  useEffect(() => {
    const getQuestion = async () => {
      const response = await Server.post('/personalized-exercises/personalize', {
        profileIdentifier: 'ee654115-aa6a-4710-902f-73813ca55bd6',
        subjectIdentifier: 'Números',
        unitIdentifier: 'Matemática financiera',
      });
      console.log('responsseeeee,', response);
      if (response && response.message && response.message.length > 0) {
        setActualQuestion(response.message[0] as Question);
      }
    };
    getQuestion();
  }, []);

  const onCheckedChange = (checked: string) => {
    setSelectedAlternative(checked);
  };

  const handleChatVisibility = async () => {
    setChatVisibility(!chatVisibility);
  };

  return (
    <MainContainer>
      {Header('Ejercicio')}
      <AssignmentCard taskStatement={actualQuestion.statement} />
      <AlternativeSelection
        alternatives={actualQuestion.alternatives}
        onCheckedChange={onCheckedChange}
      />
      <View style={styles.space} />
      <Pressable style={[styles.contestarButton]} onPress={handleChatVisibility}>
        <ThemedText style={styles.textStyle} centered>
          {' '}
          Contestar
        </ThemedText>
      </Pressable>
      <Pressable style={[styles.button]} onPress={handleChatVisibility}>
        <ThemedText style={styles.textStyle} centered>
          {' '}
          💬 Ayuda
        </ThemedText>
      </Pressable>
      <ChatModal
        chatVisibility={chatVisibility}
        setChatVisibility={setChatVisibility}
        actualQuestionId={actualQuestion.identifier}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    backgroundColor: '#0078fe',
    alignSelf: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  contestarButton: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    backgroundColor: '#20c997',
    alignSelf: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  space: {
    display: 'flex',
    flexGrow: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

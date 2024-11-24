import { Pressable, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { AlternativeSelection, AssignmentCard } from '@/components';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { loremImpsum } from '@/assets/loremipsum';
import { ThemedText } from '@/components/ThemedText';
import ChatModal from '@/components/ChatModal';
import { Header, MainContainer } from '@/app/(tabs)';
import Server from '@/server/server';

type Props = PropsWithChildren<{
  subjectId: string;
  unitId: string;
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

export default function Task({ subjectId, unitId }: Props) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [readyForNextQuestion, setreadyForNextQuestion] = useState(false);
  const [chatVisibility, setChatVisibility] = useState(false);
  const [actualQuestionIndex, setActualQuestionIndex] = useState(0);
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
  const [allQuestions, setAllQuestions] = useState([] as Question[]);
  const [selectedAlternative, setSelectedAlternative] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const getQuestion = async () => {
      const response = await Server.post('/personalized-exercises/personalize', {
        profileIdentifier: 'ee654115-aa6a-4710-902f-73813ca55bd6',
        subjectIdentifier: subjectId,
        unitIdentifier: unitId,
      });
      console.log('all questions,', JSON.stringify(response));
      if (response && response.message && response.message.length > 0) {
        setActualQuestion(response.message[0] as Question);
        setAllQuestions(response.message);
        setActualQuestion(response.message[0] as Question);
        setActualQuestionIndex(0);
        setIsLoading(false);
      }
    };

    getQuestion();
  }, []);

  async function handleNextQuestion() {
    setAnswered(false);
    if (actualQuestionIndex + 1 < allQuestions.length) {
      setActualQuestion(allQuestions[actualQuestionIndex + 1]);
      setActualQuestionIndex(actualQuestionIndex + 1);
    } else {
      showStats();
    }
  }

  function showStats() { }

  async function answerQuestion() {
    setAnswered(true);
    console.log('selectedAlternative', selectedAlternative);

    const isCorrect = actualQuestion.alternatives[Number(selectedAlternative)].isCorrect;

    console.log('isCorrect', isCorrect);

    setIsCorrect(isCorrect);
    setreadyForNextQuestion(true);
  }

  const onCheckedChange = async (checked: string) => {
    setSelectedAlternative(checked);
    setAnswered(false);
    setreadyForNextQuestion(false);
  };

  const handleChatVisibility = async () => {
    setChatVisibility(!chatVisibility);
  };

  const handleNextQuestionWrapper = async () => {
    setreadyForNextQuestion(false);
    setIsCorrect(false);
    setAnswered(false);
    handleNextQuestion();
  }

  return (
    <MainContainer>
      {Header('Ejercicio')}
      {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> :
      (
      <ScrollView>
        <AssignmentCard taskStatement={actualQuestion.statement} />
        <AlternativeSelection
          alternatives={actualQuestion.alternatives}
          onCheckedChange={onCheckedChange}
          isDisabled={answered}
        />
        <View style={styles.space} />
        {(answered && isCorrect) ? (
          <ThemedText style={styles.textStyle} centered>
            {' '}
            Correcto! 🎉
          </ThemedText>
        ) :  ( (answered) &&
          <ThemedText style={styles.textStyle} centered>
            {' '}
            Incorrecto! 😞
          </ThemedText>
        )}
        <Pressable style={[styles.contestarButton]} onPress={readyForNextQuestion ? handleNextQuestionWrapper : answerQuestion}>
          <ThemedText style={styles.textStyle} centered>
            {' '}
            {readyForNextQuestion ? 'Siguiente' : 'Contestar'}
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
      </ScrollView>

      )
    }

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
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

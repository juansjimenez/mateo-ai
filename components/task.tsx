import { ImageSourcePropType, Pressable, View, StyleSheet } from 'react-native';
import { AlternativeSelection, AssignmentCard } from '@/components';
import React, { PropsWithChildren, useState } from 'react';
import { loremImpsum } from '@/assets/loremipsum';
import { ThemedText } from '@/components/ThemedText';
import ChatModal from '@/components/ChatModal';
import { Header, MainContainer } from '@/app/(tabs)';

type Props = PropsWithChildren<{
  placeholderImageSource: ImageSourcePropType | undefined;
  taskStatement: string;
}>;

export default function Task() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [actualQuestion, setActualQuestion] = useState(
    'b6611aa2-ad26-4236-a077-00cf1d5b4002',
  );
  const handleChatVisibility = () => {
    setChatVisibility(!chatVisibility);
  };

  return (
    <MainContainer>
      {Header('Ejercicio')}
      <AssignmentCard
        taskStatement={loremImpsum}
      />
      <AlternativeSelection />
      <View style={styles.space} />
      <Pressable style={[styles.contestarButton]} onPress={handleChatVisibility}>
        <ThemedText style={styles.textStyle} centered> Contestar</ThemedText>
      </Pressable>
      <Pressable style={[styles.button]} onPress={handleChatVisibility}>
        <ThemedText style={styles.textStyle} centered> 💬 Ayuda</ThemedText>
      </Pressable>
      <ChatModal
        chatVisibility={chatVisibility}
        setChatVisibility={setChatVisibility}
        actualQuestionId={actualQuestion}
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

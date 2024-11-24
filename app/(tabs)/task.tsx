import { ImageSourcePropType, Pressable, ScrollView, StyleSheet } from 'react-native';
import { AlternativeSelection, AssignmentCard } from '@/components';
import React, { PropsWithChildren, useState } from 'react';
import { loremImpsum } from '@/assets/loremipsum';
import ChatModal from '../../components/ChatModal';
import { ThemedText } from '@/components/ThemedText';

type Props = PropsWithChildren<{
  placeholderImageSource: ImageSourcePropType | undefined;
  taskStatement: string;
}>;

export default function Assignment() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [actualQuestion, setActualQuestion] = useState(
    'b6611aa2-ad26-4236-a077-00cf1d5b4002',
  );
  const handleChatVisibility = () => {
    setChatVisibility(!chatVisibility);
  };

  return (
    <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>
      <AssignmentCard
        placeholderImageSource={require('../../assets/images/excercise/ejercicio.png')}
        taskStatement={loremImpsum}
        hasProgress={false}
      />
      <AlternativeSelection />
      <Pressable style={[styles.button]} onPress={handleChatVisibility}>
        <ThemedText style={styles.textStyle}> 💬 Chat</ThemedText>
      </Pressable>
      <ChatModal
        chatVisibility={chatVisibility}
        setChatVisibility={setChatVisibility}
        actualQuestionId={actualQuestion}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#0078fe',
    width: '30%',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ChatMessage from './ChatMessage';
import server from '@/server/server';
import { ScrollView } from 'react-native-gesture-handler';

interface ChatModalProps {
  chatVisibility: boolean;
  setChatVisibility: (value: boolean) => void;
  actualQuestionId: string;
}

function ChatModal({
  actualQuestionId,
  chatVisibility,
  setChatVisibility,
}: ChatModalProps) {
  const initial = { text: 'En qué quieres que te ayude?', origin: 'bot' };
  const options = ['Explicame', 'Siguiente pregunta'];
  const [messages, setMessages] = useState([initial]);
  const [loading, setLoading] = useState(false);
  const [currentOptions, setCurrentOptions] = useState(options);

  const handleOptionSelected = async (option: string) => {
    if (option === 'Explicame') {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          text: 'Explicame',
          origin: 'user',
        },
      ]);
      setLoading(true);
      const response = await server.get(`/personalized-exercises/${actualQuestionId}`);
      new Promise((resolve) =>
        setTimeout(() => {
          resolve('result');
        }, 3000),
      );
      setLoading(false);
      if (response && response.message && response.message.solutionExplanation) {
        setMessages((prev) => [
          ...prev,
          {
            text: response.message.solutionExplanation,
            origin: 'bot',
            isMarkdown: true,
          },
        ]);
        setCurrentOptions(['Siguiente pregunta']);
      }
    } else {
      setChatVisibility(false);
      setMessages(() => [initial]);
      setCurrentOptions(options);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={chatVisibility}>
      <View style={styles.container}>
        <ScrollView style={styles.chatList}>
          <FlatList
            data={messages}
            renderItem={({ item, index }) => <ChatMessage message={item} key={index} />}
          />
          {loading && <ChatMessage message={{ text: '...', origin: 'bot' }} />}
        </ScrollView>
        {/* Selector Options */}
        {currentOptions.length > 0 && (
          <View style={styles.selectorContainer}>
            {currentOptions.map((option, index) => (
              <Pressable
                key={index}
                style={[styles.button]}
                onPress={() => handleOptionSelected(option)}
              >
                <ThemedText style={styles.textStyle}>{option}</ThemedText>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatList: {
    padding: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: {
    backgroundColor: '#0078fe',
    padding: 10,
    borderRadius: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChatModal;

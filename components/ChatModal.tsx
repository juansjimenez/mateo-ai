import React, { useState } from 'react';
import { View, FlatList, StyleSheet,Modal, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ChatMessage from './ChatMessage';


interface ChatModalProps {
  chatVisibility: boolean;
  setChatVisibility: (value: boolean) => void;
}

const ChatModal = ({chatVisibility, setChatVisibility}:ChatModalProps) => {
const initial=  { text: 'En qué quieres que te ayude?', origin: 'bot' }
const options= ['Explicame', 'Siguiente pregunta']
  const [messages, setMessages] = useState([
   initial
  ]);

  const [currentOptions, setCurrentOptions] = useState(options); // Options displayed in the selector

  const handleOptionSelected = (option:string) => {
    // Add the user's choice as a message
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: option, origin: 'user' },
    ]);

    // Simulate bot response based on the choice
    if (option === 'Explicame') {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          text: 'Let me explain it again.',
          origin: 'bot',
          options,
        },
      ]);

    } else {
      setChatVisibility(false)
      setMessages(() => [initial]);
    }
      setCurrentOptions(options);
  };

  return (
  <Modal animationType="slide" transparent={true} visible={chatVisibility}>
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <ChatMessage message={item} id= {index}/>
        )}
        contentContainerStyle={styles.chatList}
      />

      {/* Selector Options */}
      {currentOptions.length > 0 && (
        <View style={styles.selectorContainer}>
          {currentOptions.map((option, index) => (
  <Pressable
 key={index}
          style={[styles.button]}
          onPress={() => handleOptionSelected(option)}>
          <ThemedText style={styles.textStyle}>{option}</ThemedText>
        </Pressable>
          ))}
        </View>
      )}
    </View>
</Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatList: {
    flexGrow: 1,
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
button:{
    backgroundColor: '#0078fe',
    padding: 10,
    borderRadius: 20,
},
textStyle:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
}
});

export default ChatModal;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MarkdownView from './Markdown';

export interface MessageInput {
  text: string;
  origin: string;
  isMarkdown?: boolean;
}

interface ChatMessageProps {
  message: MessageInput;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.origin === 'user';

  return (
    <View
      style={[styles.messageContainer, isUser ? styles.alignRight : styles.alignLeft]}
    >
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.botBubble]}>
        {message.isMarkdown ? (
          <MarkdownView taskStatement={message.text} fontColor="white" fontSize={12} />
        ) : (
          <Text style={styles.messageText}>{message.text}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    borderRadius: 15,
    padding: 10,
    maxWidth: '75%',
  },
  userBubble: {
    backgroundColor: '#20c997',
  },
  botBubble: {
    backgroundColor: '#0078fe',
  },
  messageText: {
    color: '#fff',
  },
  optionsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ChatMessage;

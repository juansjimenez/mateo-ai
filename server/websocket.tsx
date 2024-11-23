import { SetStateAction, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { MessageInput } from '../components/ChatMessage';

function WebsocketTerminal({
  setMessages,
}: {
  setMessages: React.Dispatch<SetStateAction<MessageInput[]>>;
}) {
  const ipServer = 'ws://192.168.1.52:8765';
  const { sendJsonMessage, lastMessage, lastJsonMessage, readyState } =
    useWebSocket(ipServer);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessages((prev) => [
        ...prev,
        { text: lastMessage as unknown as string, origin: 'bot' },
      ]);
    }
    if (lastJsonMessage !== null) {
      console.log(JSON.stringify(lastJsonMessage));
    }
    return () => {};
  }, [lastMessage, setMessages, lastJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const sendMessageToSocket = ({
    message,
    question,
  }: {
    message: string;
    question: string;
  }) => {
    const object = {
      type: 'setParam',
      message,
      question,
    };
    sendJsonMessage(object);
  };

  return {
    sendMessageToSocket,
    readyState,
    lastMessage,
    lastJsonMessage,
  };
}

export default WebsocketTerminal;

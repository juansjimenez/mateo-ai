import { ImageSourcePropType, Pressable, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper'
import { ProgressBar, AlternativeSelection } from '@/components';
import React, { PropsWithChildren, useState } from 'react';
import {loremImpsum} from '@/assets/loremipsum'
import ChatModal from '../../components/ChatModal';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';


type Props = PropsWithChildren<{
  placeholderImageSource: ImageSourcePropType | undefined;
  taskStatement: string;
}>;

function AssignmentCard( {
  children,
  placeholderImageSource,
  taskStatement,
}: Props ) {
    const [chatVisibility, setChatVisibility] = useState(false);
  const [actualQuestion, setActualQuestion] = useState('');

  return (
    <Card>
      <ProgressBar />
      <Card.Cover source={placeholderImageSource} />
      <Card.Title title="Card Title"/>
      <Card.Content>
        <Text> {taskStatement} </Text>
      </Card.Content>
    </Card>
  );
}


export default function Assignment() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [actualQuestion, setActualQuestion] = useState('');
  const handleChatVisibility= () => {
    setChatVisibility(!chatVisibility)
  }

    return (
        <ParallaxScrollView headerImage={},
        
        >
          <AssignmentCard 
            placeholderImageSource={require('../../assets/images/modules/modulo1.png')}
            taskStatement={loremImpsum}
          />
          <AlternativeSelection/>
          <Pressable
          style={[styles.button]}
          onPress={handleChatVisibility}>
          <ThemedText style={styles.textStyle}>Chat</ThemedText>
        </Pressable>
          <ChatModal chatVisibility={chatVisibility} setChatVisibility={setChatVisibility} actualQuestion={actualQuestion}/>

       </ParallaxScrollView>
    );
  };

  const styles = StyleSheet.create({
    home:{
    height: '100%'
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
        marginLeft:'auto',
        marginTop:'auto'
      },
     textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });
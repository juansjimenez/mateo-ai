import { ImageSourcePropType, Text, View } from 'react-native';
import { Card } from 'react-native-paper'
import { ProgressBar, AlternativeSelection } from '@/components';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  placeholderImageSource: ImageSourcePropType | undefined;
  taskStatement: string;
}>;

function AssignmentCard( {
  children,
  placeholderImageSource,
  taskStatement,
}: Props ) {
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
    return (
        <View>
          <AssignmentCard 
            placeholderImageSource={require('../../assets/images/modules/modulo1.png')}
            taskStatement="This is a task statement"
          />
          <AlternativeSelection/>
       </View>
    );
  };
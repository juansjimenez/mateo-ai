import { ImageSourcePropType, Text, View } from 'react-native';
import { Card } from 'react-native-paper'
import { ProgressBar } from '@/components';

function AssignmentCard(placeholderImageSource: ImageSourcePropType | undefined, taskStatement:string ) {
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
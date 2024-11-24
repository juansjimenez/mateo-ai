import { View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import React from 'react';
import MarkdownView from './Markdown';

const styles = StyleSheet.create({
  alternativeContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 10,
    alignContent: 'center',
  },
  textContainer: {
    padding: 10,
  },
});

interface AlternativeSelectionProps {
  alternatives: { index: number; text: string }[];
  onCheckedChange: (checked: string) => void;
}

const AlternativeSelection: React.FC<AlternativeSelectionProps> = ({
  alternatives,
  onCheckedChange,
}) => {
  const [checked, setChecked] = React.useState('first');

  const handlePress = (id: string) => {
    setChecked(id);
    onCheckedChange(id);
  };

  return (
    <>
      {alternatives.map((alternative) => (
        <View key={alternative.index} style={styles.alternativeContainer}>
          <RadioButton
            value={`${alternative.index}`}
            status={checked === `${alternative.index}` ? 'checked' : 'unchecked'}
            onPress={() => handlePress(`${alternative.index}`)}
          />
          <MarkdownView taskStatement={alternative.text} />
        </View>
      ))}
    </>
  );
};

export default AlternativeSelection;

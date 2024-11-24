import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import React from 'react';

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
  alternatives: { id: string; text: string }[];
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
        <View key={alternative.id} style={styles.alternativeContainer}>
          <RadioButton
            value={alternative.id}
            status={checked === alternative.id ? 'checked' : 'unchecked'}
            onPress={() => handlePress(alternative.id)}
          />
          <Text style={styles.textContainer}>{alternative.text}</Text>
        </View>
      ))}
    </>
  );
};

export default AlternativeSelection;

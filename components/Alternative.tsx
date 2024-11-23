import { View, Text, StyleSheet} from 'react-native';
import { RadioButton } from 'react-native-paper';
import React from 'react';
const mockAlternatives = require('../app/datatypes/mocks/mockAlternatives.json')

const styles = StyleSheet.create({
    alternativeContainer: {
      flexDirection: 'row',
      marginVertical: 5,
      paddingHorizontal: 10,
      alignContent: 'center'
    },
    textContainer: {
        padding: 10
    }

})
const AlternativeSelection = () => {
    const [checked, setChecked] = React.useState('first');
    let alternatives = []
    for(let alternativeIdx in mockAlternatives){
        let alternative = mockAlternatives[alternativeIdx]
        alternatives.push(
            <View style={styles.alternativeContainer}>
                <RadioButton
                value={alternative.id}
                status={ checked === alternative.id ? 'checked' : 'unchecked' }
                onPress={() => setChecked(alternative.id)}
                />
                <Text
                    style= {styles.textContainer}
                >
                    {alternative.text}
                </Text>
            </View>
        )
    }
    return alternatives
  };
  
export default AlternativeSelection;

import { View, Text} from 'react-native';
import { RadioButton } from 'react-native-paper';
import * as React from 'react';
const mockAlternatives = require('../assets/mockAlternatives.json')

const AlternativeSelection = () => {
    const [checked, setChecked] = React.useState('first');
    let alternatives = []
    for(let alternativeIdx in mockAlternatives){
        let alternative = mockAlternatives[alternativeIdx]
        alternatives.push(
            <View>
                <RadioButton
                value={alternative.id}
                status={ checked === alternative.id ? 'checked' : 'unchecked' }
                onPress={() => setChecked(alternative.id)}
                />
                <Text>
                    {alternative.text}
                </Text>
            </View>
        )
    }
    return alternatives
  };
  
export default AlternativeSelection;

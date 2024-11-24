import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import Server from '@/server/server';

interface Preference {
  category: string;
  value: string;
}

interface SavePreferenceInputReq {
  name: string;
  preferences: Preference[];
}

export default function PreferenceScreen() {
  const initialPreferences = [
    {
      icon: '🎹',
      text: 'Música',
      id: 1,
      selected: false,
    },
    {
      icon: '🎬',
      text: 'Peliculas',
      id: 2,
      selected: false,
    },
    {
      icon: '⚽',
      text: 'Deporte',
      id: 3,
      selected: false,
    },
    {
      icon: '🎨',
      text: 'Arte',
      id: 4,
      selected: false,
    },
  ];

  const [preferences, setPreferences] = useState({
    name: '',
    interests: initialPreferences,
  });

  const updateInterest = (index: number) => {
    const copy = [...preferences.interests];
    copy[index].selected = !preferences.interests[index].selected;
    setPreferences({ name: preferences.name, interests: copy });
  };

  const savePreferences = async () => {
    const selectedInterests: Preference[] = [];
    preferences.interests.map((interest) => {
      if (interest.selected)
        selectedInterests.push({ category: interest.text, value: interest.text });
    });
    await Server.post('/profiles', {
      name: preferences.name,
      preferences: selectedInterests,
    });
  };

  return (
    <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>
      <ThemedView style={styles.mainContainer} darkColor="black">
        <ThemedText type="defaultSemiBold" darkColor="black">
          Ingresa tu nombre
        </ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setPreferences({
              name: text,
              interests: preferences.interests,
            })
          }
          value={preferences.name}
          placeholder=""
          keyboardType="default"
        />
        <ThemedText type="defaultSemiBold" darkColor="black">
          Selecciona tus interéses
        </ThemedText>
        <ThemedView style={styles.interestContainer}>
          {preferences.interests.map((preference, index) => (
            <Pressable
              key={preference.id}
              style={[
                styles.interestButton,
                preference.selected
                  ? styles.interestButtonSelected
                  : styles.interestButtonNotSelected,
              ]}
              onPress={() => updateInterest(index)}
            >
              <ThemedText type="defaultSemiBold" darkColor="black">
                {preference.icon} {preference.text}
              </ThemedText>
            </Pressable>
          ))}
        </ThemedView>
        <Pressable style={styles.sendButton}>
          <ThemedText type="defaultSemiBold" onPress={savePreferences}>
            Guardar
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: 10,
    paddingTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'grey',
  },
  interestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 20,
    margin: 5,
    fontSize: 12,
    borderColor: 'white',
    borderWidth: 2,
  },
  interestButtonNotSelected: {
    borderColor: 'white',
  },
  interestButtonSelected: {
    borderColor: '#0078fe',
  },
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: 'white',
  },
  sendButton: {
    marginTop: 50,
    backgroundColor: '#0078fe',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 20,
  },
  icon: {
    fontSize: 12,
  },
});

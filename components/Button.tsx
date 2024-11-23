import { ImageSourcePropType, Pressable, Text, StyleSheet, useTheme } from 'react-native';
import { Card, Button, useTheme } from 'react-native-paper';

function Button(){
    const theme = useTheme()
    const styles = makeStyles(theme)
    return (
        <Button style={styles.button}> Aprender </Button>
    )
}

const makeStyles = (theme: Theme) => {
    return StyleSheet.create({
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: theme.colors.clickable,
        width: '10%',
        marginTop: 10,
        color: 'white',
      }
    })
};
  
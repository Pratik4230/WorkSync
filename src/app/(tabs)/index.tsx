import {  Button, Text, TextInput, View } from 'react-native'
import React from 'react'
import 'expo-router/entry'
import "../../constants/themes"
import { StyleSheet } from 'react-native-unistyles'

const Home = () => {
  return (
    <View style={styles.container} >
      <Text>Home</Text>
      <Button
        title="Click me"
        onPress={() => {
          console.log('Button pressed')
        }}
      />




<View style={styles.box}></View>
<View style={styles.box}></View>
{/* <View style={styles.box}></View>
<View style={styles.box}></View>
<View style={styles.box}></View>
<View style={styles.box}></View> */}

<View>
  <Text style={styles.text}>Hello</Text>
  <TextInput   placeholder='Enter your name' style={styles.input} />
</View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {
          translateY: rt.insets.ime * -1
      }
    ],
    backgroundColor: theme.colors.primary 
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    width: '80%'
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: {
      md: 'red',
      lg: 'blue',
      xl: 'green'
    }
  },

  box: {
    width: 100,
    height: 100,
    backgroundColor: {
      md: 'red',
      lg: 'blue',
      xl: 'green'
    }
  }
}))

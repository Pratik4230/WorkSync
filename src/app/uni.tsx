import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native-unistyles'

const Uni = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <View style={styles.box}>
        <TextInput style={styles.input} placeholder='Enter your name' />
      <View style={styles.box1}>
      <View style={styles.box2}>
      <View style={styles.box3}>
      <View style={styles.box4}> </View>
         </View>
</View>
</View>
      </View>
    <Text style={styles.text2}>Hello</Text>
    </View>
  )
}

export default Uni

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingHorizontal: rt.insets.left,
    paddingRight: rt.insets.right,
    transform: [
      {
          translateY: rt.insets.ime * -1,
      }
  ],
  gap: theme.gap(1),
  },

  box: {
    backgroundColor: theme.colors.surface,
    width: '80%',
    height: '70%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box1: {
    backgroundColor: theme.colors.accent,
    width: '80%',
    height: '70%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box2: {
    backgroundColor: theme.colors.card,
    width: '80%',
    height: '70%',  
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  

  box3: {
    backgroundColor: theme.colors.primary,
    width: '80%',
    height: '70%',  
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },


  box4: {
    backgroundColor: theme.colors.secondary,
    width: '80%',
    height: '70%',  
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },

  text2: {
    color: theme.colors.textSecondary,
    fontSize: 20,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: theme.colors.card,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 10,
    margin: 10,
    color: theme.colors.text,
    fontSize: 20,
  },



}))
import { ScrollView,  Text, View } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native-unistyles'
import Button from '../UI/Button'
import Label from '../UI/Label'
import Input from '../UI/Input'
import AlertDialog from '../UI/AlertDialog'
import Avatar from '../UI/Avatar'
import Badge from '../UI/Badge'
import Skeleton, { CardSkeleton, ListItemSkeleton, PostSkeleton, ProfileSkeleton } from '../UI/Skeleton'
import Switch from '../UI/Switch'
import Spacer from '../UI/Spacer'



const Uni = () => { 
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
    <ScrollView>
      {/* Showcase Button variants */}
      <View style={{ gap: 12, width: '100%', alignItems: 'center', marginBottom: 24 }}>
        <Button  variant="primary" style={{ width: 200 }}>Primary</Button>
        <Button variant="secondary" style={{ width: 200 }}>Secondary</Button>
        <Button variant="blue" style={{ width: 200 }}>Blue</Button>
        <Button variant="green" style={{ width: 200 }}>Green</Button>
        <Button variant="orange" style={{ width: 200 }}>Orange</Button>
        <Button variant="destructive" style={{ width: 200 }}>Destructive</Button>
        <Button  variant="outline" style={{ width: 200 }}>Outline</Button>
        <Button  variant="ghost" style={{ width: 200 }}>Ghost</Button>
       
       

        <Label  >Hello</Label>

        <Input  value='' variant='secondary' placeholder="Enter your name" onChangeText={() => {}} />

 {/* <AlertDialog visible={true} onClose={() => {}} title="Hello" description="This is a test alert dialog" confirmLabel="OK" cancelLabel="Cancel" onConfirm={() => {}} onCancel={() => {}} confirmVariant='blue' cancelVariant='outline'  /> */}
 
 <Spacer height={30} />
 
 <Avatar alt="P J" size="lg" />

 <Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive" size="lg">Danger</Badge>
<Badge variant="outline" size="sm">Outline</Badge>

<Skeleton  style={{  width: '100%', height: 120, borderRadius: 12 }} />

<PostSkeleton style={{  width: '100%', height: 120, borderRadius: 12 }} />

<ProfileSkeleton style={{  width: '100%', height: 120, borderRadius: 12 }} />

<ListItemSkeleton style={{  width: '100%', height: 120, borderRadius: 12 }} />

<CardSkeleton style={{  width: '100%', height: 120, borderRadius: 12 }} />


<Switch
 checked={checked}
 onChange={() => setChecked(!checked)} />



      </View>
      <View style={styles.box}>
       
      <View style={styles.box1}>
      <View style={styles.box2}>
      <View style={styles.box3}>
      <View style={styles.box4}> </View>


         </View>
</View>
</View>
      </View>
    
    </ScrollView>
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
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingHorizontal: rt.insets.left,
    
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




}))
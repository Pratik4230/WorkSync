import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" size={size ?? 24} color={color ?? (focused ? 'black' : 'gray')} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="information-circle" size={size ?? 24} color={color ?? (focused ? 'black' : 'gray')} />
          ),
        }}
      />
    </Tabs>
  );
}


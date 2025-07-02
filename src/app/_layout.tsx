import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



const RootLayout = () => {
const queryClient = new QueryClient()
  const isAuthenticated = false

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <Stack>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
      <Stack.Screen name="uni" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />

        
      </Stack.Protected>
      
    </Stack>
    </QueryClientProvider>
    </>
  )
}

export default RootLayout
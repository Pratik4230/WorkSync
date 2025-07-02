import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'expo-router'
import "../constants/unistyles"

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormData = z.infer<typeof schema>

const loginApi = async (data: FormData) => {
  // Replace with your actual API endpoint
  const res = await axios.post('https://httpbin.org/post', data)
  return res.data
}

const Login = () => {
  const { theme } = useUnistyles()
  const router = useRouter()
  const { register, setValue, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: loginApi,
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  // For controlled inputs
  React.useEffect(() => {
    register('email')
    register('password')
  }, [register])

  return (
    <View style={styles.screen(theme)}>
      <View style={styles.card(theme)}>
        <Text style={styles.title(theme)}>Login</Text>
        <TextInput
          style={styles.input(theme)}
          placeholder="Email"
          placeholderTextColor={theme.colors.textSecondary}
          onChangeText={v => setValue('email', v)}
          value={watch('email')}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.error(theme)}>{errors.email.message}</Text>}

        <TextInput
          style={styles.input(theme)}
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
          onChangeText={v => setValue('password', v)}
          value={watch('password')}
          secureTextEntry
        />
        {errors.password && <Text style={styles.error(theme)}>{errors.password.message}</Text>}

        <Pressable
          style={({ pressed }) => [
            styles.button(theme),
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <ActivityIndicator color={theme.colors.surface} />
          ) : (
            <Text style={styles.buttonText(theme)}>Login</Text>
          )}
        </Pressable>

        {mutation.isSuccess && (
          <Text style={styles.success(theme)}>Login successful!</Text>
        )}
        {mutation.isError && (
          <Text style={styles.error(theme)}>Login failed. Please try again.</Text>
        )}

        <Pressable onPress={() => router.push('/signup')} style={styles.linkContainer}>
          <Text style={styles.link(theme)}>
            Don't have an account? <Text style={styles.linkBold(theme)}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create((theme, rt) => ({
  screen: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.gap(2),
  }),
  card: (theme) => ({
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.gap(2),
    padding: theme.gap(3),
    shadowColor: theme.colors.text,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
    alignItems: 'stretch',
  }),
  title: (theme) => ({
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.gap(3),
    alignSelf: 'center',
  }),
  input: (theme) => ({
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.gap(1),
    padding: theme.gap(2),
    marginBottom: theme.gap(1),
    fontSize: 16,
  }),
  button: (theme) => ({
    backgroundColor: theme.colors.primary,
    padding: theme.gap(2),
    borderRadius: theme.gap(1),
    alignItems: 'center',
    marginTop: theme.gap(2),
    marginBottom: theme.gap(1),
    shadowColor: theme.colors.text,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  }),
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: (theme) => ({
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: 18,
  }),
  error: (theme) => ({
    color: theme.colors.error,
    marginBottom: theme.gap(1),
    fontSize: 14,
  }),
  success: (theme) => ({
    color: theme.colors.success,
    marginTop: theme.gap(2),
    fontSize: 16,
    alignSelf: 'center',
  }),
  linkContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  link: (theme) => ({
    color: theme.colors.info,
    fontSize: 15,
  }),
  linkBold: (theme) => ({
    color: theme.colors.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }),
}))


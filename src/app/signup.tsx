import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'expo-router'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

const signupApi = async (data: FormData) => {
  // Replace with your actual API endpoint
  const res = await axios.post('https://httpbin.org/post', data)
  return res.data
}

const Signup = () => {
  const { theme } = useUnistyles()
  const router = useRouter()

  const { register, setValue, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const mutation = useMutation({
    mutationFn: signupApi,
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  // For controlled inputs
  React.useEffect(() => {
    register('name')
    register('email')
    register('password')
    register('confirmPassword')
  }, [register])

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={theme.colors.textSecondary}
          onChangeText={v => setValue('name', v)}
          value={watch('name')}
          autoCapitalize="words"
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
        <View style={styles.inputSpacer} />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.textSecondary}
          onChangeText={v => setValue('email', v)}
          value={watch('email')}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
        <View style={styles.inputSpacer} />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
          onChangeText={v => setValue('password', v)}
          value={watch('password')}
          secureTextEntry
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
        <View style={styles.inputSpacer} />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={theme.colors.textSecondary}
          onChangeText={v => setValue('confirmPassword', v)}
          value={watch('confirmPassword')}
          secureTextEntry
        />
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <ActivityIndicator color={theme.colors.surface} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </Pressable>

        {mutation.isSuccess && (
          <Text style={styles.success}>Sign up successful!</Text>
        )}
        {mutation.isError && (
          <Text style={styles.error}>Sign up failed. Please try again.</Text>
        )}

        <Pressable onPress={() => router.push('/login')} style={styles.linkContainer}>
          <Text style={styles.link(theme)}>
            Already have an account? <Text style={styles.linkBold(theme)}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.gap(3),
    justifyContent: 'center',
  },

  card: {
    backgroundColor: theme.colors.card,
    padding: theme.gap(1),
    borderRadius: theme.gap(1),
    marginBottom: theme.gap(2),
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.gap(3),
    alignSelf: 'center',
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.gap(1),
    padding: theme.gap(2),
    fontSize: 16,
  },
  inputSpacer: {
    height: theme.gap(1.5),
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.gap(2),
    borderRadius: theme.gap(1),
    alignItems: 'center',
    marginTop: theme.gap(2),
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: theme.colors.secondary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.gap(1),
    fontSize: 14,
  },
  success: {
    color: theme.colors.success,
    marginTop: theme.gap(2),
    fontSize: 16,
    alignSelf: 'center',
  },
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
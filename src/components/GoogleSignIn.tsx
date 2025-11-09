import { useToast } from '@/providers/toast'
import { useSignInWithGoogleMutation } from '@/queries/auth'
import supabase from '@/services/supabase'
import { authExceptionMessages } from '@/utils/auth-exceptions'
import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { ActivityIndicator } from 'react-native'

export default function GoogleSignInButton() {

    const {showToast} = useToast()

    const {mutateAsync: signInWithGoogle, isPending} = useSignInWithGoogleMutation()

    GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    })

    async function SignInWithGoogle() {
      try {
        await GoogleSignin.hasPlayServices()
        const response = await GoogleSignin.signIn()
        if (isSuccessResponse(response)) {
          signInWithGoogle({token: response.data.idToken!, displayName: response.data.user?.name!, image_url: response.data.user?.photo!})
        }
      } catch (error: any) {
        if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          showToast({
              title: 'Aviso',
              message: 'Login em progresso, tente novamente.',
              variant: 'error',
          });
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          showToast({
              title: 'Aviso',
              message: 'Play services não disponível ou desatualizado, tente novamente.',
              variant: 'error',
          });
        } else {
          // some other error happened
          showToast({
              title: 'Aviso',
              message: 'Erro ao fazer login, tente novamente.',
              variant: 'error',
          });
        }
      }
    }
  
    if(isPending) return <ActivityIndicator size={"small"} color={"#4D5DFA"} />

    return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={SignInWithGoogle}
      />
    )
}
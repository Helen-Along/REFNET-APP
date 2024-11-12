import * as React from 'react';
import { Image, View } from 'react-native';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import {H1, P} from "~/components/ui/typography"

export default function Screen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onEmailInput = (text: string) => {
    setEmail(text);
  };
  const onPasswordInput = (text: string) => {
    setPassword(text);
  };
  function handleUserSignin(){
    if(email && password){
      console.log("User signed in")
      return;
    }
    console.log("Please fill in all the inputs")
  }
  return (
    <View className="flex-1 justify-between items-center gap-5 px-6 py-14 bg-[#131313]">
      <View className='w-full mb-auto mt-auto gap-6'>
        <View className="w-full gap-4">
          <Input
            placeholder="Email Address"
            value={email}
            onChangeText={onEmailInput}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="bg-[#333] border-0 !h-14 text-white"
            autoComplete='email'
            textContentType='emailAddress'
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="New Password"
            value={password}
            onChangeText={onPasswordInput}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="bg-[#333] border-0 !h-14 text-white"
            autoComplete='password'
            textContentType='password'
            secureTextEntry
          />
        </View>
        <Button onPress={handleUserSignin} className="w-full" size={'lg'}>
          <P>Reset password now</P>
        </Button>
        <P className="text-center text-base pt-4 color-[#b3b3b3]" style={{fontFamily: "Inter_400Regular"}}>
          Forgot your password? No worries{"\n"}lets help you get back to your account    
        </P>
      </View>
    </View>
  );
}

import * as React from 'react';
import { Image, View } from 'react-native';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import {P} from "~/components/ui/typography"

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
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <View className='w-20 h-20 object-fill'>
        <Image source={require("~/assets/images/Logo.png")} style={{width: "100%", height:  "100%", objectFit: "fill"}} />
      </View>
      <View>
        <Input
          placeholder='Email or Phone number'
          value={email}
          onChangeText={onEmailInput}
          aria-labelledby='inputLabel'
          aria-errormessage='inputError'
        />
        <Input
          placeholder='Password'
          value={password}
          onChangeText={onPasswordInput}
          
          aria-labelledby='inputLabel'
          aria-errormessage='inputError'
        />
      </View>
      <Button onPress={handleUserSignin} className='w-full'>
        <P className='text-white dark:text-black'>Sign in</P>
      </Button>
    </View>
  );
}

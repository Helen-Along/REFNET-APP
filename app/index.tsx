import * as React from 'react';
import { Image, View } from 'react-native';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import {P} from "~/components/ui/typography"
import { Link } from "expo-router";

export default function Screen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onEmailInput = (text: string) => {
    setEmail(text);
  };
  const onPasswordInput = (text: string) => {
    setPassword(text);
  };

  function handleUserSignup(){
    if(email && password){
      console.log("User signed in")
      return;
    }
    console.log("Please fill in all the inputs")
  }
  return (
    <View className="flex-1 justify-between items-center gap-5 px-6 py-14 bg-[#131313]">
      <View className="w-full h-10 object-contain">
        <Image
          source={require("~/assets/images/Logo.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </View>
      <View className="w-full mb-auto mt-auto gap-6">
        <View className="w-full gap-4">
          <Input
            placeholder="Email address"
            value={email}
            onChangeText={onEmailInput}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="bg-[#333] border-0 !h-14 text-white"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={onPasswordInput}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="bg-[#333] border-0 !h-14 text-white"
            autoComplete="password"
            textContentType="password"
            secureTextEntry
          />
        </View>
        <Button onPress={handleUserSignup} className="w-full" size={"lg"}>
          <P>Login for free</P>
        </Button>
        <P className="text-center">
          <P style={{ fontFamily: "Inter_400Regular" }}>or</P>{" "}<Link href="/reset-password">Recover Password</Link>
        </P>
        <P
          className="text-center text-lg pt-4 color-[#b3b3b3]"
          style={{ fontFamily: "Inter_400Regular" }}
        >
          Sign in to access your account and manage your air conditioning
          solutions
        </P>
      </View>
      <P className="text-center" >
          <Link href="/sign-up">I'm new here <P className="text-blue-400">Sign me up</P></Link>
        </P>
    </View>
  );
}

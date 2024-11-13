import * as React from 'react';
import { Image, View } from 'react-native';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { H1, P } from "~/components/ui/typography"
import { Link, router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import { resetUserPassword } from "~/lib/supabase";

const displayNotification = (
  message: string,
  type: "danger" | "success" | "warning"
) => {
  return showMessage({
    message,
    type,
    hideOnPress: true,
    style: {
      marginTop: 40,
    },
    titleStyle: {
      fontFamily: "Inter_500Medium",
      textAlign: "center",
    },
  });
};


export default function Screen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onEmailInput = (text: string) => {
    setEmail(text);
  };
  const onPasswordInput = (text: string) => {
    setPassword(text);
  };
  const handlePasswordRest = async () => {
    if (email && password) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        displayNotification("Invalid Email", "warning");
        return;
      }
      const response = await resetUserPassword(email, password);
      if (typeof response === "string" && response.startsWith("Error:")) {
        displayNotification(response, "danger");
        return;
      } else {
        displayNotification("Password reset successful", "success");
        router.push({
          pathname: "/",
        });
      }
    } else {
      displayNotification("Please fill all fields", "warning");
    }
  };
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
        <Button onPress={handlePasswordRest} className="w-full" size={'lg'}>
          <P>Reset password now</P>
        </Button>
        <P className="text-center text-base pt-4 color-[#b3b3b3]" style={{fontFamily: "Inter_400Regular"}}>
          Forgot your password? No worries{"\n"}lets help you get back to your account    
        </P>
      </View>
    </View>
  );
}

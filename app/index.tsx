import * as React from 'react';
import { Image, View } from 'react-native';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import {P} from "~/components/ui/typography"
import { Link, router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import { checkUser, validateUserCredentials } from "~/lib/supabase";
import { useEmail } from "~/app/EmailContext";

const displayNotification = (
  message: string,
  type: "danger" | "success" | "warning"
) => {
  return showMessage({
    message,
    type,
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
    // router.push({
    //   pathname: "/user_dashboard",
    //   params: { email: email },
    // });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const emailContext = useEmail();
  const { setEmail: setEmailContext } = emailContext || { setEmail: () => {} };

  const onEmailInput = (text: string) => {
    setEmail(text);
  };
  const onPasswordInput = (text: string) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    if (email && password) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        displayNotification("Invalid Email", "warning");
        return;
      }
      const UserAvailable = await checkUser(email);
      if (!UserAvailable) {
        displayNotification("User does not exist", "danger");
        return;
      }
      const isValid = await validateUserCredentials(email, password);
      if (isValid["role"]) {
        const user_role = isValid["role"];
        console.log(isValid["role"]);
        if (user_role === "Customer") {
          router.push({
            pathname: "/user_dashboard",
            params: { email: email },
          });
        } else if (user_role === "Finance Manager") {
          router.push({
            pathname: "../finance_manager_dashboard",
            params: { email: email },
          });
        } else if (user_role === "Dispatch Manager") {
          router.push({
            pathname: "../dispatch_manager_dashboard",
            params: { email: email },
          });
        }

        setEmailContext(email);
        return;
      }
      displayNotification("Invalid Credentials", "danger");
    } else {
      displayNotification("Please fill all the fields", "warning");
    }
  };
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
        <Button onPress={handleLogin} className="w-full" size={"lg"}>
          <P>Login for free</P>
        </Button>
        <P className="text-center">
          <P style={{ fontFamily: "Inter_400Regular" }}>or</P>{" "}
          <Link href="/reset-password">Recover Password</Link>
        </P>
        <P
          className="text-center text-lg pt-4 color-[#b3b3b3]"
          style={{ fontFamily: "Inter_400Regular" }}
        >
          Sign in to access your account and manage your air conditioning
          solutions
        </P>
      </View>
      <P className="text-center">
        <Link href="/sign-up">
          I'm new here <P className="text-blue-400">Sign me up</P>
        </Link>
      </P>
    </View>
  );
}

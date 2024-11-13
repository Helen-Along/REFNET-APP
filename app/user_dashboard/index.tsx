import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { P } from "~/components/ui/typography";
import { Link, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { showMessage } from "react-native-flash-message";
import { addUserToDB } from "~/lib/supabase";
import CartCount from "~/components/CartCount";

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
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const onEmailInput = (text: string) => {
    setEmail(text);
  };
  const onPasswordInput = (text: string) => {
    setPassword(text);
  };
  const onPhoneNumberInput = (text: string) => {
    setPhoneNumber(text);
  };
  const onUserNameInput = (text: string) => {
    setUserName(text);
  };
  const onFullNameInput = (text: string) => {
    setFullName(text);
  };
  const validateInputs = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!userName || !fullName || !email || !phoneNumber || !password) {
      return "Please fill in all the fields";
    }
    if (!emailPattern.test(email)) {
      return "Please enter a valid email address";
    }
    if (!phonePattern.test(phoneNumber)) {
      return "Please enter a valid phone number (10 digits)";
    }
    return null;
  };

  const handleSignup = async () => {
    const validationError = validateInputs();
    if (validationError) {
      displayNotification(validationError, "warning");
      return;
    }
    if (userName && fullName && email && phoneNumber && password) {
      const response = await addUserToDB(
        userName,
        fullName,
        email,
        password,
        Number(phoneNumber)
      );
      if (response.startsWith("Success")) {
        router.push({
          pathname: "/",
        });
        displayNotification("User created successfully", "success");
        return;
      }
      displayNotification("User already exists", "danger");
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
        <CartCount />
      </View>
    </View>
  );
}

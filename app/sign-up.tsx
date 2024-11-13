import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { P } from "~/components/ui/typography";
import { Link } from "expo-router";
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
  function handleUserSignin() {
    if (email && password) {
      console.log("User signed in");
      return;
    }
    console.log("Please fill in all the inputs");
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
        <ScrollView>
          <View className="w-full gap-4">
            <Input
              placeholder="Username"
              value={userName}
              onChangeText={onUserNameInput}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
              className="bg-[#333] border-0 !h-14 text-white"
              autoComplete="username"
              textContentType="name"
            />
            <Input
              placeholder="Full Name"
              value={fullName}
              onChangeText={onFullNameInput}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
              className="bg-[#333] border-0 !h-14 text-white"
              autoComplete="name"
              textContentType="name"
            />
            <Input
              placeholder="Phone number"
              value={phoneNumber}
              onChangeText={onPhoneNumberInput}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
              className="bg-[#333] border-0 !h-14 text-white"
              autoComplete="tel"
              textContentType="telephoneNumber"
              keyboardType="number-pad"
            />
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
            <Select defaultValue={{ value: "customer", label: "Customer" }}>
              <SelectTrigger className="w-full bg-[#333] border-0 !h-14 text-white">
                <SelectValue
                  className="text-white text-sm native:text-lg bg-[#333]"
                  placeholder="Select your role"
                  style={{ fontFamily: "Inter_400Regular" }}
                />
              </SelectTrigger>
              <SelectContent
                insets={contentInsets}
                className="border-0 bg-[#333] w-full px-4 !h-14 text-white"
              >
                <SelectGroup className="text-white bg-[#333]">
                  <SelectLabel
                    className="text-white"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    Role
                  </SelectLabel>
                  <SelectItem
                    label="Customer"
                    value="customer"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    Customer
                  </SelectItem>
                  <SelectItem label="Service Manager" value="service_manager">
                    Service Manager
                  </SelectItem>
                  <SelectItem
                    label="Finance controller"
                    value="finance_controller"
                  >
                    Finance Controller
                  </SelectItem>
                  <SelectItem label="Stock Manager" value="stock_manager">
                    Stock Manager
                  </SelectItem>
                  <SelectItem label="Technician" value="technician">
                    Technician
                  </SelectItem>
                  <SelectItem label="Supervisor" value="supervisor">
                    Supervisor
                  </SelectItem>
                  <SelectItem label="Supplier" value="supplier">
                    Supplier
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>
        </ScrollView>
        <Button onPress={handleUserSignin} className="w-full" size={"lg"}>
          <P>Continue</P>
        </Button>
        <P
          className="text-center text-lg pt-4 color-[#b3b3b3]"
          style={{ fontFamily: "Inter_400Regular" }}
        >
          Sign in to access your account and manage your air conditioning
          solutions
        </P>
      </View>
    </View>
  );
}

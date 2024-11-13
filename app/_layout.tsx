import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Loading } from '~/components/Loading';
import FlashMessage from "react-native-flash-message";
import { EmailProvider } from "./EmailContext"; 

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!isColorSchemeLoaded) {
    return null;
  }
  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <ThemeProvider value={DARK_THEME}>
      <StatusBar style={"light"} />
      <EmailProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Index",
              headerShown: false,
              navigationBarColor: "#131313",
            }}
          />
          <Stack.Screen
            name="reset-password"
            options={{
              title: "Reset Password",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#101010" },
              headerTitleStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 16,
              },
              navigationBarColor: "#131313",
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              title: "Create an account",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#101010" },
              headerTitleStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 16,
              },
              navigationBarColor: "#131313",
            }}
          />
          <Stack.Screen
            name="user_dashboard/index"
            options={{
              title: "User Dashboard",
              headerShown: false,
              headerTitleStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 16,
              },
              navigationBarColor: "#131313",
            }}
          />
        </Stack>
      </EmailProvider>
      <PortalHost />
      <FlashMessage position="top" />
    </ThemeProvider>
  );
}

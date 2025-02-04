import { Stack, Tabs } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(tabs)"
        options={{
          headerTitle: "Sticker Smash",
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="+not-found"
        options={{
          headerTitle: "Oops! Not Found",
        }}
      />
    </Tabs>
  );
}

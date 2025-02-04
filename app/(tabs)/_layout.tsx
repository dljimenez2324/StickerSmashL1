import { Stack, Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Sticker Smash",
          // headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerTitle: "About",
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

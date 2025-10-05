// Keep these at the very top (Reanimated must be imported before anything else)
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      />
    </GestureHandlerRootView>
  );
}

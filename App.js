import "./global.css";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AppProvider, useApp } from "./src/context/AppContext";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const AppContent = () => {
  const { yukleniyor } = useApp();

  if (yukleniyor) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2980B9" />
        <Text className="mt-4 text-[#7F8C8D]">Lezzetler yükleniyor...</Text>
      </View>
    );
  }

  return <AppNavigator />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        {/* edges={['top']} sadece üstten boşluk bırakır, kaymayı önler */}
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
          <AppContent />
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}

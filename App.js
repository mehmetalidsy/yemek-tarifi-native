import "./global.css";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AppProvider, useApp } from "./src/context/AppContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

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
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

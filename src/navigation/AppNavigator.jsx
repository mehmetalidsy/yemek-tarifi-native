import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";

import TarifListesi from "../../screens/TarifListesi";
import TarifDetay from "../../screens/TarifDetay";
import Favoriler from "../../screens/Favoriler";
import Auth from "../../screens/Auth";
import QrScreen from "../../screens/QrScreen";
import AddModal from "../../components/AddModal";
import MyButton from "../../components/MyButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TariflerStack = () => {
  const { toggleFavori, favoriIdler, tarifler, logout, setModalGorunur } = useApp();

  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#FDFEFE" } }}>
      <Stack.Screen
        name="TarifListesi"
        options={({ navigation }) => ({
          headerTitle: "Mutfak Rehberi",
          headerTitleStyle: { fontWeight: "bold", color: "#2C3E50" },
          headerLeft: () => (
            <TouchableOpacity onPress={logout} className="ml-2.5 flex-row items-center">
              <Ionicons name="log-out-outline" size={20} color="#E74C3C" />
              <Text className="text-[#E74C3C] font-bold text-[12px] ml-1">Çıkış</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="flex-row items-center gap-2 mr-2.5">
              <TouchableOpacity onPress={() => navigation.navigate("QrScreen")}>
                <Ionicons name="qr-code-outline" size={24} color="#2980B9" />
              </TouchableOpacity>
              <MyButton text="Yeni Ekle" onPress={() => setModalGorunur(true)}/>
            </View>
          ),
        })}
      >
        {(props) => (
          <TarifListesi {...props} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="TarifDetay"
        component={TarifDetay}
        options={({ route }) => ({ title: route.params.isim })}
      />
      <Stack.Screen
        name="QrScreen"
        component={QrScreen}
        options={{ title: "QR Kodlar" }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { favoriIdler, tarifler } = useApp();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2980B9",
        tabBarInactiveTintColor: "#95A5A6",
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 11 },
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === "TariflerTab" ? "restaurant" : "heart";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="TariflerTab"
        component={TariflerStack}
        options={{
          title: "Tarifler",
          tabBarBadge: favoriIdler.length > 0 ? favoriIdler.length : null,
        }}
      />
      <Tab.Screen name="FavorilerTab" component={Favoriler} options={{ title: "Favoriler" }} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { user, modalGorunur, setModalGorunur, addRecipe, addCategory } = useApp();

  return (
    <NavigationContainer>
      {!user ? (
        <Auth />
      ) : (
        <>
          <TabNavigator />
          <AddModal
            visible={modalGorunur}
            onClose={() => setModalGorunur(false)}
            onAddRecipe={addRecipe}
            onAddCategory={addCategory}
          />
        </>
      )}
    </NavigationContainer>
  );
};

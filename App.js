import "./global.css";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

// Screens
import TarifListesi from "./screens/TarifListesi";
import TarifDetay from "./screens/TarifDetay";
import Favoriler from "./screens/Favoriler";
import Auth from "./screens/Auth";

// Components
import AddModal from "./components/AddModal";

// Data
import initialTarifler from "./data/tarifler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [tarifler, setTarifler] = useState(initialTarifler);
  const [kategoriler, setKategoriler] = useState(["Çorbalar", "Ana Yemekler", "Tatlılar"]);
  const [favoriIdler, setFavoriIdler] = useState([]);
  const [modalGorunur, setModalGorunur] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(true);

  // Verileri Yukle
  useEffect(() => {
    const verileriYukle = async () => {
      try {
        const saklananTarifler = await AsyncStorage.getItem("tarifler");
        const saklananFavoriler = await AsyncStorage.getItem("favoriIdler");
        const saklananUser = await AsyncStorage.getItem("user");

        if (saklananTarifler) setTarifler(JSON.parse(saklananTarifler));
        if (saklananFavoriler) setFavoriIdler(JSON.parse(saklananFavoriler));
        if (saklananUser) setUser(JSON.parse(saklananUser));
      } catch (e) {
        console.log("Veri yükleme hatası:", e);
      } finally {
        setYukleniyor(false);
      }
    };
    verileriYukle();
  }, []);

  // Verileri Sakla
  useEffect(() => {
    const verileriKaydet = async () => {
      try {
        await AsyncStorage.setItem("tarifler", JSON.stringify(tarifler));
        await AsyncStorage.setItem("favoriIdler", JSON.stringify(favoriIdler));
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem("user");
        }
      } catch (e) {
        console.log("Veri kaydetme hatası:", e);
      }
    };
    if (!yukleniyor) verileriKaydet();
  }, [tarifler, favoriIdler, user, yukleniyor]);

  const handleLogout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const toggleFavori = (id) => {
    setFavoriIdler((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const onAddRecipe = (yeni) => {
    const formatted = {
      ...yeni,
      id: Math.random().toString(36).substr(2, 9),
      sure: parseInt(yeni.sure) || 0,
      malzemeler: yeni.malzemeler.split(",").map(m => m.trim()),
    };
    setTarifler([formatted, ...tarifler]);
    setModalGorunur(false);
  };

  const onAddCategory = (yeni) => {
    setKategoriler([yeni, ...kategoriler]);
    setModalGorunur(false);
  };

  const TariflerStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#FDFEFE' } }}>
      <Stack.Screen
        name="TarifListesi"
        options={{
          headerTitle: "Mutfak Rehberi",
          headerTitleStyle: { fontWeight: 'bold', color: '#2C3E50' },
          headerLeft: () => (
            <TouchableOpacity onPress={handleLogout} className="ml-2.5 flex-row items-center">
              <Ionicons name="log-out-outline" size={20} color="#E74C3C" />
              <Text className="text-[#E74C3C] font-bold text-[12px] ml-1">Çıkış</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setModalGorunur(true)} className="mr-[15px] bg-[#2ECC71] px-3 py-1.5 rounded-full shadow-sm">
              <Text className="text-white font-bold text-[14px]">Yeni Ekle</Text>
            </TouchableOpacity>
          ),
        }}
      >
        {(props) => (
          <TarifListesi
            {...props}
            toggleFavori={toggleFavori}
            favoriIdler={favoriIdler}
            tarifler={tarifler}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="TarifDetay"
        component={TarifDetay}
        options={({ route }) => ({ title: route.params.isim })}
      />
    </Stack.Navigator>
  );

  if (yukleniyor) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2980B9" />
        <Text className="mt-4 text-[#7F8C8D]">Lezzetler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <Auth onLogin={setUser} />
      ) : (
        <>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: "#2980B9",
              tabBarInactiveTintColor: "#95A5A6",
              tabBarLabelStyle: { fontWeight: "bold", fontSize: 11 },
              tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "TariflerTab") iconName = "restaurant";
                else if (route.name === "FavorilerTab") iconName = "heart";
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
            <Tab.Screen name="FavorilerTab" options={{ title: "Favoriler" }}>
              {(props) => <Favoriler {...props} route={{ ...props.route, params: { favoriIdler, tarifler } }} />}
            </Tab.Screen>
          </Tab.Navigator>

          <AddModal
            visible={modalGorunur}
            onClose={() => setModalGorunur(false)}
            onAddRecipe={onAddRecipe}
            onAddCategory={onAddCategory}
          />
        </>
      )}
    </NavigationContainer>
  );
}

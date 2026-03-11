import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TarifDetay({ route, navigation }) {
  const { isim, sure, malzemeler, yapilis, id, toggleFavori, favoriMi } =
    route.params;

  return (
    <ScrollView className="flex-1 bg-[#FDFEFE]">
      <View className="bg-[#2980B9] p-5 items-center">
        <Text className="text-[26px] font-bold text-white text-center">{isim}</Text>
        <Text className="text-[16px] text-[#D6EAF8] mt-1.5">{sure} dakika</Text>
      </View>

      <TouchableOpacity
        className={`m-[15px] p-3.5 rounded-xl flex-row justify-center items-center shadow-md ${favoriMi ? "bg-[#95A5A6]" : "bg-[#E74C3C]"
          }`}
        style={{ elevation: 4 }}
        onPress={() => {
          toggleFavori(id);
          navigation.goBack();
        }}
      >
        <Ionicons
          name={favoriMi ? "heart-dislike" : "heart"}
          size={22}
          color="white"
          style={{ marginRight: 8 }}
        />
        <Text className="text-white text-[16px] font-bold">
          {favoriMi ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        </Text>
      </TouchableOpacity>

      <Text className="text-xl font-bold mx-[15px] mt-[15px] mb-2 text-[#2C3E50]">Malzemeler</Text>
      {malzemeler.map((malzeme, index) => (
        <View key={index} className="flex-row items-center mx-[20px] mb-1">
          <Text className="text-[#2980B9] mr-2">•</Text>
          <Text className="text-[15px] text-[#34495E] flex-1">{malzeme}</Text>
        </View>
      ))}

      <Text className="text-xl font-bold mx-[15px] mt-[15px] mb-2 text-[#2C3E50]">Yapılış</Text>
      <View className="mx-[15px] p-4 bg-white rounded-xl border border-[#E5E7E9] shadow-sm">
        <Text className="text-[15px] text-[#34495E] leading-6">{yapilis}</Text>
      </View>

      <View className="h-10" />
    </ScrollView>
  );
}

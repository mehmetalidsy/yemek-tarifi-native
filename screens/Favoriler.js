// screens/Favoriler.js
import React from "react";
import { View, Text, FlatList } from "react-native";
import RecipeCard from "../components/RecipeCard";

export default function Favoriler({ route, navigation }) {
  const { favoriIdler, tarifler } = route.params || { favoriIdler: [], tarifler: [] };

  const favoriTarifler = (tarifler || []).filter((tarif) =>
    favoriIdler.includes(tarif.id),
  );

  const renderFavori = ({ item }) => (
    <RecipeCard
      item={item}
      favoriMi={true}
      onPress={() => navigation.navigate("TarifDetay", { ...item, favoriMi: true })}
    />
  );

  return (
    <View className="flex-1 bg-[#FDFEFE] pt-2.5">
      <Text className="text-2xl font-bold text-center my-4 text-[#E74C3C]">Favori Tariflerim</Text>
      {favoriTarifler.length === 0 ? (
        <View className="flex-1 justify-center items-center px-10">
          <Text className="text-[18px] font-semibold text-[#2C3E50] text-center mb-2.5">
            Henüz favori tarif eklemediniz.
          </Text>
          <Text className="text-sm text-[#7F8C8D] text-center leading-5">
            Tarifler sekmesinden bir tarife tıklayın ve kalp ikonuna basarak ekleyin.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriTarifler}
          renderItem={renderFavori}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

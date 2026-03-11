import React, { useState } from "react";
import { View, Text, FlatList, TextInput, ScrollView, TouchableOpacity } from "react-native";
import RecipeCard from "../components/RecipeCard";

export default function TarifListesi({
  navigation,
  toggleFavori,
  favoriIdler,
  tarifler,
}) {
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Hepsi");

  const kategoriler = ["Hepsi", ...new Set(tarifler.map(t => t.kategori).filter(Boolean))];

  const filtrelenmişTarifler = tarifler.filter((tarif) => {
    const isimUyuyor = tarif.isim.toLowerCase().includes(aramaMetni.toLowerCase());
    const kategoriUyuyor = seciliKategori === "Hepsi" || tarif.kategori === seciliKategori;
    return isimUyuyor && kategoriUyuyor;
  });

  const renderTarif = ({ item }) => (
    <RecipeCard
      item={item}
      favoriMi={favoriIdler.includes(item.id)}
      onPress={() =>
        navigation.navigate("TarifDetay", {
          ...item,
          toggleFavori: toggleFavori,
          favoriMi: favoriIdler.includes(item.id),
        })
      }
    />
  );

  return (
    <View className="flex-1 bg-[#FDFEFE]">
      <TextInput
        className="h-[45px] bg-[#F2F3F4] m-[15px] px-[15px] rounded-[10px] text-[16px] border border-[#E5E7E9]"
        placeholder="Tarif ismiyle ara..."
        value={aramaMetni}
        onChangeText={setAramaMetni}
      />

      <View className="h-[50px] mb-[10px]">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2.5">
          {kategoriler.map((kat) => (
            <TouchableOpacity
              key={kat}
              onPress={() => setSeciliKategori(kat)}
              className={`px-[15px] h-[35px] justify-center rounded-[18px] mx-[5px] ${seciliKategori === kat ? "bg-[#2980B9]" : "bg-[#EBEDEF]"
                }`}
            >
              <Text className={`font-semibold ${seciliKategori === kat ? "color-white" : "text-[#566573]"
                }`}>
                {kat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtrelenmişTarifler}
        renderItem={renderTarif}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text className="text-center mt-[50px] text-[#95A5A6] text-[16px]">Sonuç bulunamadı.</Text>}
      />
    </View>
  );
}

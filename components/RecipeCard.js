import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RecipeCard = ({ item, onPress, favoriMi }) => {
    return (
        <TouchableOpacity
            className="bg-yazi mx-4 my-1.5 p-4 rounded-xl border-l-[8px] border-ana/50 shadow-sm flex-row justify-between items-center"
            onPress={onPress}
            disabled={!onPress}
            style={{ elevation: 3 }}
        >
            <View className="flex-1">
                <Text className="text-[18px] font-bold text-ana">{item.isim}</Text>
                <View className="flex-row items-center mt-1">
                    <Ionicons name="time-outline" size={14} color="#fff" />
                    <Text className="text-sm text-ana ml-1">{item.sure} dakika</Text>
                </View>
                <View className="mt-1 bg-[#ffffff] self-start px-2 py-0.5 rounded-full">
                    <Text className="text-[11px] text-yazi/50 font-semibold">{item.kategori || "Genel"}</Text>
                </View>
            </View>

            <View className="ml-2">
                <Ionicons
                    name={favoriMi ? "heart" : "heart-outline"}
                    size={24}
                    color={favoriMi ? "#E74C3C" : "#BDC3C7"}
                />
            </View>
        </TouchableOpacity>
    );
};

export default RecipeCard;

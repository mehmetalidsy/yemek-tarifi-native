import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

const AddModal = ({ visible, onClose, onAddRecipe, onAddCategory }) => {
    const [eklemeTuru, setEklemeTuru] = useState("tarif");
    const [yeniTarif, setYeniTarif] = useState({
        isim: "",
        sure: "",
        kategori: "Ana Yemek",
        malzemeler: "",
        yapilis: "",
    });
    const [yeniKategori, setYeniKategori] = useState("");

    const handleRecipeAdd = () => {
        if (!yeniTarif.isim || !yeniTarif.sure) return;
        onAddRecipe(yeniTarif);
        setYeniTarif({ isim: "", sure: "", kategori: "Ana Yemek", malzemeler: "", yapilis: "" });
    };

    const handleCategoryAdd = () => {
        if (!yeniKategori) return;
        onAddCategory(yeniKategori);
        setYeniKategori("");
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center">
                <View className="bg-white w-[90%] max-h-[80%] rounded-[20px] p-5 shadow-xl" style={{ elevation: 5 }}>
                    <View className="flex-row mb-5 border-b border-[#eee]">
                        <TouchableOpacity
                            onPress={() => setEklemeTuru("tarif")}
                            className={`flex-1 py-2.5 items-center ${eklemeTuru === "tarif" ? "border-b-2 border-[#2980B9]" : ""}`}
                        >
                            <Text className={`text-[16px] ${eklemeTuru === "tarif" ? "text-[#2980B9] font-bold" : "text-[#7f8c8d]"}`}>
                                Tarif
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setEklemeTuru("kategori")}
                            className={`flex-1 py-2.5 items-center ${eklemeTuru === "kategori" ? "border-b-2 border-[#2980B9]" : ""}`}
                        >
                            <Text className={`text-[16px] ${eklemeTuru === "kategori" ? "text-[#2980B9] font-bold" : "text-[#7f8c8d]"}`}>
                                Kategori
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {eklemeTuru === "tarif" ? (
                            <View>
                                <TextInput
                                    className="border border-[#ddd] rounded-lg p-3 mb-[15px] text-[16px] bg-[#f9f9f9]"
                                    placeholder="Tarif İsmi"
                                    value={yeniTarif.isim}
                                    onChangeText={(text) => setYeniTarif({ ...yeniTarif, isim: text })}
                                />
                                <TextInput
                                    className="border border-[#ddd] rounded-lg p-3 mb-[15px] text-[16px] bg-[#f9f9f9]"
                                    placeholder="Süre (Dakika)"
                                    keyboardType="numeric"
                                    value={yeniTarif.sure}
                                    onChangeText={(text) => setYeniTarif({ ...yeniTarif, sure: text })}
                                />
                                <TextInput
                                    className="border border-[#ddd] rounded-lg p-3 mb-[15px] text-[16px] bg-[#f9f9f9]"
                                    placeholder="Kategori (örn: Kahvaltı)"
                                    value={yeniTarif.kategori}
                                    onChangeText={(text) => setYeniTarif({ ...yeniTarif, kategori: text })}
                                />
                                <TextInput
                                    className="border border-[#ddd] rounded-lg p-3 mb-[15px] text-[16px] bg-[#f9f9f9]"
                                    placeholder="Malzemeler (Virgülle ayırın)"
                                    value={yeniTarif.malzemeler}
                                    onChangeText={(text) =>
                                        setYeniTarif({ ...yeniTarif, malzemeler: text })
                                    }
                                />
                                <TextInput
                                    className="border border-[#ddd] rounded-lg p-3 mb-[15px] text-[16px] bg-[#f9f9f9] h-[100px]"
                                    placeholder="Yapılış"
                                    multiline
                                    value={yeniTarif.yapilis}
                                    onChangeText={(text) =>
                                        setYeniTarif({ ...yeniTarif, yapilis: text })
                                    }
                                />
                                <TouchableOpacity
                                    className="bg-[#2980B9] p-[15px] rounded-lg items-center"
                                    onPress={handleRecipeAdd}
                                >
                                    <Text className="color-white font-bold text-[16px]">Tarif Ekle</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <TextInput
                                    className="border border-[#ddd] rounded-lg p-3 mb-[15px] text-[16px] bg-[#f9f9f9]"
                                    placeholder="Kategori Adı"
                                    value={yeniKategori}
                                    onChangeText={setYeniKategori}
                                />
                                <TouchableOpacity
                                    className="bg-[#2980B9] p-[15px] rounded-lg items-center"
                                    onPress={handleCategoryAdd}
                                >
                                    <Text className="color-white font-bold text-[16px]">Kategori Ekle</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <TouchableOpacity
                            className="bg-[#95a5a6] p-[15px] rounded-lg items-center mt-2.5"
                            onPress={onClose}
                        >
                            <Text className="color-white font-bold text-[16px]">Vazgeç</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default AddModal;

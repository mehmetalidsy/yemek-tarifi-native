import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
  Linking,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useApp } from "../src/context/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TarifDetay({ route, navigation }) {
  const { isim, sure, malzemeler, yapilis, id } = route.params;
  const { toggleFavori, favoriIdler } = useApp();
  const favoriMi = favoriIdler.includes(id);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [pendingShare, setPendingShare] = useState(null);

  React.useEffect(() => {
    if (pendingShare === 'native' && !shareModalVisible) {
      const message = formatMessage();
      Share.share({
        message: message,
        title: `${isim} - Tarifi`,
      }).catch(() => {});
      setPendingShare(null);
    }
  }, [shareModalVisible, pendingShare]);

  const formatMessage = () => {
    const malzemeListesi = malzemeler.map((m) => `▫ ${m}`).join("\n");
    const pufNoktalari = getPufNoktalari(isim);
    
    return `
╔═══════════════════════════════════╗
║      🍽️  ${isim.toUpperCase()}  🍽️      ║
╚═══════════════════════════════════╝

📋 KISA BİLGİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️  Hazırlama Süresi: ${sure} dakika
👥  Porsiyon: 4 kişilik
📊  Zorluk: ${getZorluk(sure)}
🏷️  Kategori: ${route.params.kategori || "Genel"}

📝 MALZEMELER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${malzemeListesi}

👨‍🍳 YAPILIŞI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${yapilis}

💡 PÜF NOKTALARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${pufNoktalari}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Paylaşan: Mutfak Rehberi
🌐 mutfakrehberi.com
    `.trim();
  };

  const handleNativeShare = () => {
    setPendingShare('native');
    setShareModalVisible(false);
  };

  const handleCopyToClipboard = async () => {
    setShareModalVisible(false);
    setTimeout(async () => {
      try {
        const message = formatMessage();
        await Clipboard.setStringAsync(message);
        Alert.alert("✅ Kopyalandı!", "Tarif panoya kopyalandı.");
      } catch (error) {
        Alert.alert("Hata", "Kopyalama sırasında bir hata oluştu.");
      }
    }, 100);
  };

  const handleShareWhatsApp = async () => {
    const message = formatMessage();
    const encodedMessage = encodeURIComponent(message);
    setShareModalVisible(false);
    
    setTimeout(async () => {
      try {
        await Linking.openURL(`whatsapp://send?text=${encodedMessage}`);
      } catch (error) {
        try {
          await Clipboard.setStringAsync(message);
        } catch (clipError) {}
        Alert.alert("✅ Kopyalandı!", "WhatsApp açılamadı.");
      }
    }, 100);
  };

  const getZorluk = (sure) => {
    if (sure <= 15) return "⭐ Çok Kolay";
    if (sure <= 30) return "⭐⭐ Kolay";
    if (sure <= 45) return "⭐⭐⭐ Orta";
    if (sure <= 60) return "⭐⭐⭐⭐ Zor";
    return "⭐⭐⭐⭐⭐ Usta Şef";
  };

  const getPufNoktalari = (isim) => {
    const pufMap = {
      "Menemen": "• Taze domates kullanın\n• Biberleri önce kavurun\n• Yumurtayı fazla pişirmeyin",
      "Makarna": "• Tuzlu suda haşlayın\n• Salçayı yağla kavurun\n• Rendelenmiş peynir ekleyin",
      "Tost": "• Ekmekleri tereyağlayın\n• Kaşarı eriyene kadar bekletin\n• köz domates kullanın",
      "Omlet": "• Yumurtaları çok çırpın\n• Tereyağı eriyince dökün\n• Katlarken kaşar ekleyin",
      "Mercimek Köftesi": "• Malzemeleri iyice karıştırın\n• Köfteleri ıslak elle şekillendirin\n• Sumaklı sos ile servis edin",
      "Mercimek Çorbası": "• Kırmızı mercimek daha lezzetli\n• Kremla daha kıvamlı olur\n• Nane ile süsleyin",
      "Köfte": "• Kıymayı 10 dk yoğurun\n• Buzdolabında dinlendirin\n• Izgara daha lezzetli olur",
      "Sütlaç": "• Pirinçleri önceden ıslatın\n• Sütü kaynatırken karıştırın\n• Üzerine tarçın serpin",
    };
    return pufMap[isim] || "• Taze malzemeler kullanın\n• Afiyet olsun!";
  };

  const ShareOption = ({ icon, title, subtitle, onPress, color }) => (
    <TouchableOpacity 
      className="flex-row items-center p-4 bg-[#F8F9FA] rounded-xl mb-3"
      onPress={onPress}
    >
      <View className={`w-12 h-12 rounded-full items-center justify-center ${color}`}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-[16px] font-bold text-[#2C3E50]">{title}</Text>
        <Text className="text-[12px] text-[#7F8C8D]">{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-[#FDFEFE]">
      <View className="bg-[#2980B9] p-5 items-center">
        <Text className="text-[26px] font-bold text-white text-center">{isim}</Text>
        <Text className="text-[16px] text-[#D6EAF8] mt-1.5">{sure} dakika</Text>
      </View>

      <View className="flex-row mx-[15px] mt-[15px] gap-3">
        <TouchableOpacity
          className={`flex-1 p-3.5 rounded-xl flex-row justify-center items-center shadow-md ${favoriMi ? "bg-[#95A5A6]" : "bg-[#E74C3C]"
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

        <TouchableOpacity
          className="bg-[#27AE60] p-3.5 rounded-xl justify-center items-center shadow-md"
          style={{ elevation: 4 }}
          onPress={() => setShareModalVisible(true)}
        >
          <Ionicons name="share-social" size={22} color="white" />
          <Text className="text-white text-[12px] font-bold mt-1">Paylaş</Text>
        </TouchableOpacity>
      </View>

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={shareModalVisible}
        onRequestClose={() => setShareModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <SafeAreaView>
            <View className="bg-white rounded-t-[25px] p-5">
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-[20px] font-bold text-[#2C3E50]">Paylaş</Text>
                <TouchableOpacity onPress={() => setShareModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#7F8C8D" />
                </TouchableOpacity>
              </View>

              <Text className="text-[14px] text-[#7F8C8D] mb-4">Tarifini paylaşmak için bir seçenek belirle:</Text>

              <ShareOption
                icon="copy-outline"
                title="Panoya Kopyala"
                subtitle="WhatsApp, Instagram, Twitter için kopyala"
                color="bg-[#3498DB]"
                onPress={handleCopyToClipboard}
              />

              <ShareOption
                icon="share-social-outline"
                title="Native Paylaşım"
                subtitle="Tüm uygulamalarla paylaş"
                color="bg-[#27AE60]"
                onPress={handleNativeShare}
              />

              <ShareOption
                icon="logo-whatsapp"
                title="WhatsApp"
                subtitle="Doğrudan WhatsApp ile gönder"
                color="bg-[#25D366]"
                onPress={handleShareWhatsApp}
              />

              <View className="h-5" />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </ScrollView>
  );
}

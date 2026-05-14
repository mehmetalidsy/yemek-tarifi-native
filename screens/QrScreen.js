import { View, useWindowDimensions } from "react-native";
import { QrCodeSvg } from "react-native-qr-svg";
import { useApp } from "../src/context/AppContext";

export default function QrScreen() {
  const { tarifler } = useApp();
  const { width } = useWindowDimensions();
  const qrSize = width * 0.1;

  const qrData = "https://www.nefisyemektarifleri.com/";

  return (
    <View className="flex-1 bg-ana justify-center items-center">
      <QrCodeSvg value={qrData} frameSize={qrSize} />
    </View>
  );
}

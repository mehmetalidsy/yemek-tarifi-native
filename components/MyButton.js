import { twMerge } from 'tailwind-merge';
import { TouchableOpacity, Text } from "react-native";

export default function MyButton({ 
  text, 
  onPress, 
  className = "", 
  rounded = "full", 
  style = {}, 
  overrideStyles = false
}) {
    
    // Varsayılan sınıflar
    const defaultStyles = `mr-[15px] bg-ana p-3 rounded-${rounded} items-center shadow-sm`;
    
    // Sınıfları birleştirme mantığı
    const finalClassName = overrideStyles 
        ? className 
        : twMerge(defaultStyles, className);

    return (
        <TouchableOpacity 
            onPress={onPress} 
            className={finalClassName} 
            style={style}
            activeOpacity={0.7}>
            <Text className="text-white font-bold text-[14px]">{text}</Text>
        </TouchableOpacity>
    );
}
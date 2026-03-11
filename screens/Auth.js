import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

export default function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (!email || !password) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }
        const userData = { email, name: email.split("@")[0] };
        onLogin(userData);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-[#FDFEFE] justify-center p-5"
        >
            <View className="bg-white p-[25px] rounded-[20px] shadow-xl" style={{ elevation: 10 }}>
                <Text className="text-[28px] font-bold text-[#2C3E50] mb-[25px] text-center">
                    {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                </Text>

                <TextInput
                    className="bg-[#F2F3F4] h-[50px] rounded-[12px] px-[15px] mb-[15px] text-[16px] border border-[#E5E7E9]"
                    placeholder="E-posta"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    className="bg-[#F2F3F4] h-[50px] rounded-[12px] px-[15px] mb-[15px] text-[16px] border border-[#E5E7E9]"
                    placeholder="Şifre"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    className="bg-[#2980B9] h-[50px] rounded-[12px] justify-center items-center mt-2.5"
                    onPress={handleSubmit}
                >
                    <Text className="color-white text-[18px] font-bold">
                        {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="mt-5 items-center"
                    onPress={() => setIsLogin(!isLogin)}
                >
                    <Text className="text-[#34495E] text-[14px]">
                        {isLogin
                            ? "Hesabınız yok mu? Kayıt Olun"
                            : "Zaten hesabınız var mı? Giriş Yapın"}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

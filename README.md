# Yemek Tarifleri Native (Expo + React Native)

Mobil (Android/iOS) ve Web’de çalışan, **yemek tarifleri** odaklı bir uygulama. Tarif listeleme/detay, favoriler ve basit giriş/çıkış akışı içerir. Veriler cihazda **AsyncStorage** ile saklanır.

## Özellikler

- **Tarif listesi ve detay ekranı**
- **Favorilere ekleme/çıkarma**
- **Yeni tarif ekleme/düzenleme/silme** (uygulama içinden)
- **Basit giriş/çıkış** (cihazda saklanır)
- **Kalıcı veri**: Tarifler ve favoriler `AsyncStorage` ile kaydedilir
- **NativeWind (Tailwind)** ile stil altyapısı

## Teknolojiler

- **Expo SDK**: 54
- **React Native**: 0.81
- **React Navigation** (Bottom Tabs + Native Stack)
- **NativeWind** + **TailwindCSS v3**

## Kurulum

Gereksinimler:

- **Node.js** (öneri: LTS)
- **npm**
- Expo Go (telefonunda test edeceksen)

Kurulum:

```bash
npm install
```

## Çalıştırma

Geliştirme sunucusu:

```bash
npm start
```

Android / iOS / Web:

```bash
npm run android
npm run ios
npm run web
```

### İnternet/Proxy sorunu olan ortamlarda (Flash bellekle çalışma vb.)

Expo CLI bazı kontroller için internete çıkmaya çalışabilir. Ağ erişimi yoksa şu şekilde başlat:

```bash
npx expo start -c --offline
```

Port doluysa:

```bash
npx expo start -c --offline --port 8083
```

## Proje Yapısı (kısa)

- `App.js`: Navigasyon ve temel uygulama akışı
- `screens/`: Ekranlar (tarif listesi/detay, favoriler, giriş)
- `components/`: Tekrarlanan bileşenler (örn. ekleme modalı)
- `data/`: Başlangıç veri seti
- `global.css`: NativeWind giriş dosyası

## Notlar / Dikkat Edilecekler

- `app.json` içinde `./assets/*` dosyaları referanslanıyor (icon/splash/favicon).
  - Repoda `assets/` klasörü yoksa Expo bazı durumlarda hata verebilir.
  - Çözüm: `assets/` klasörünü ekleyip dosyaları koy veya `app.json` yollarını güncelle.

## Sık Karşılaşılan Hatalar

### NativeWind + Tailwind sürümü

NativeWind v4, **TailwindCSS v3** ile çalışır. Bu projede `tailwindcss` sürümü **3.4.4** olarak sabitlenmiştir.

### Metro/Babel hataları

Önbellek kaynaklı sorunlarda:

```bash
npx expo start -c
```

## Lisans

Bu proje eğitim amaçlıdır. İstersen bir lisans ekleyebilirsin (örn. MIT).

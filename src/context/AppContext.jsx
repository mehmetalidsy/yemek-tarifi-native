import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useStorage } from "../hooks/useStorage";
import initialTarifler from "../../data/tarifler";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { loadAll, saveTarifler, saveFavoriIdler, saveUser, removeUser } = useStorage();
  
  const [user, setUser] = useState(null);
  const [tarifler, setTarifler] = useState(initialTarifler);
  const [kategoriler, setKategoriler] = useState(["Çorbalar", "Ana Yemekler", "Tatlılar"]);
  const [favoriIdler, setFavoriIdler] = useState([]);
  const [modalGorunur, setModalGorunur] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const init = async () => {
      const data = await loadAll();
      if (data.tarifler) setTarifler(data.tarifler);
      if (data.favoriIdler) setFavoriIdler(data.favoriIdler);
      if (data.user) setUser(data.user);
      setYukleniyor(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!yukleniyor) {
      saveTarifler(tarifler);
      saveFavoriIdler(favoriIdler);
    }
  }, [tarifler, favoriIdler, yukleniyor]);

  useEffect(() => {
    if (!yukleniyor) {
      user ? saveUser(user) : removeUser();
    }
  }, [user, yukleniyor]);

  const toggleFavori = useCallback((id) => {
    setFavoriIdler((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }, []);

  const addRecipe = useCallback((yeni) => {
    const formatted = {
      ...yeni,
      id: Math.random().toString(36).substr(2, 9),
      sure: parseInt(yeni.sure) || 0,
      malzemeler: yeni.malzemeler.split(",").map((m) => m.trim()),
    };
    setTarifler((prev) => [formatted, ...prev]);
    setModalGorunur(false);
  }, []);

  const addCategory = useCallback((yeni) => {
    setKategoriler((prev) => [yeni, ...prev]);
    setModalGorunur(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    removeUser();
  }, []);

  const value = {
    user,
    setUser,
    tarifler,
    setTarifler,
    kategoriler,
    setKategoriler,
    favoriIdler,
    modalGorunur,
    setModalGorunur,
    yukleniyor,
    toggleFavori,
    addRecipe,
    addCategory,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

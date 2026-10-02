import { create } from "zustand";
import { persist } from "zustand/middleware";
import Language from "../enums/Language";

interface LanguageState {
    currentLanguage: Language;
    setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageState>()(persist(set => ({
    currentLanguage: Language.korean,
    setLanguage: (language: Language) => set({currentLanguage: language})
}), {
    name: "language-storage",
    // 서버 렌더링 결과와 어긋나지 않도록 마운트 후 Providers에서 불러옴
    skipHydration: true
}))
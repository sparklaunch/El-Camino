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
}), {name: "language-storage"}))
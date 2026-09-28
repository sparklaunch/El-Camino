import { create } from "zustand";
import Language from "../enums/Language";

interface LanguageState {
    currentLanguage: Language;
    setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
    currentLanguage: Language.korean,
    setLanguage: (language: Language) => set({currentLanguage: language})
}));
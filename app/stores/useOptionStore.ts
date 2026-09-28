import { create } from "zustand";
import { persist } from "zustand/middleware";
import Option from "../enums/Option";

interface OptionState {
    option?: Option;
    setOption: (option: Option) => void;
}

export const useOptionStore = create<OptionState>()(persist(set => ({
    option: undefined,
    setOption: (option: Option) => set({option})
}), {name: "option-storage"}));
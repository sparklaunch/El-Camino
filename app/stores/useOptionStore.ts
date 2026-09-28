import { create } from "zustand";
import Option from "../enums/Option";

interface OptionState {
    option?: Option;
    setOption: (option: Option) => void;
}

export const useOptionStore = create<OptionState>(set => ({
    option: undefined,
    setOption: (option: Option) => set({option})
}))
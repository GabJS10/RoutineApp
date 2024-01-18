import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useUserStore = create(
    persist(
        (set) => ({
            username: "",
            email: "",
            avatar: "",
            biography: "",
            date_joined: "",
            setUserData: (data) => set(() => ({ ...data })),
            logout: () => set(() => ({ username: "", email: "", avatar: "", biography: "", date_joined: "" })),
        }),
        { name: "user" }
    )
)
"use client";
import { useContext, createContext, useState } from "react";

// Tạo ProfileContext
const ProfileContext = createContext();

// Tạo ProfileProvider
function ProfileProvider({ children, initialProfile }) {
  const [profile, setProfile] = useState(initialProfile);
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Custom hook để sử dụng context
const useProfile = () => {
  return useContext(ProfileContext);
};
export { ProfileProvider, useProfile };

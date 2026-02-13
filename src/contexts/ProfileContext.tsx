import { createContext, useContext, type ReactNode } from 'react'
import profileData from '@/data/profile.json'
import type { Profile } from '@/types/profile'

interface ProfileContextType {
  profile: Profile
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  return (
    <ProfileContext.Provider value={{ profile: profileData }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

import { createContext, useContext } from 'react'
import type { Profile } from '@/types/profile'

export interface ProfileContextType {
  profile: Profile
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

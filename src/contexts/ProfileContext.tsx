import type { ReactNode } from 'react'
import profileData from '@/data/profile.json'
import { ProfileContext } from '@/contexts/ProfileContextValue'

export function ProfileProvider({ children }: { children: ReactNode }) {
  return (
    <ProfileContext.Provider value={{ profile: profileData }}>
      {children}
    </ProfileContext.Provider>
  )
}

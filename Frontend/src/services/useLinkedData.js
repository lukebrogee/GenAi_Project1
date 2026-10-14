import { useSyncExternalStore } from 'react'
import { getVersion, subscribe } from './dataService'

// Re-renders the calling component whenever accounts are linked or unlinked.
// Call it in each page; the version is also handy as a useMemo dependency.
export function useLinkedData() {
  return useSyncExternalStore(subscribe, getVersion)
}

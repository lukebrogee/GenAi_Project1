// Single access point for the mock-data layer (Backend/data). Components and
// pages read data through here rather than importing the JSON directly.
//
// Backend/data holds prepared data for every institution a user could link
// (standing in for what a Plaid-style API would return). Only the accounts the
// user has *linked* are visible to the rest of the app. The linked set is kept
// in localStorage and changes notify subscribers (see useLinkedData.js).
import allAccounts from '@data/accounts.json'
import categories from '@data/categories.json'
import institutions from '@data/institutions.json'
import allTransactions from '@data/transactions.json'
import user from '@data/user.json'

const STORAGE_KEY = 'cardfolio.linkedAccountIds'

const accountsById = new Map(allAccounts.map((a) => [a.id, a]))
const categoriesById = new Map(categories.map((c) => [c.id, c]))
const institutionsById = new Map(institutions.map((i) => [i.id, i]))

// ---- linked-account state -------------------------------------------------

function defaultLinkedIds() {
  const defaults = new Set(
    institutions.filter((i) => i.linkedByDefault).map((i) => i.id),
  )
  return new Set(
    allAccounts.filter((a) => defaults.has(a.institutionId)).map((a) => a.id),
  )
}

function loadLinkedIds() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(stored)) {
      return new Set(stored.filter((id) => accountsById.has(id)))
    }
  } catch {
    // Storage unavailable or corrupt: fall back to the defaults.
  }
  return defaultLinkedIds()
}

let linkedIds = loadLinkedIds()
let linkedAccounts = []
let linkedTransactions = []
let version = 0
const listeners = new Set()

function refresh() {
  linkedAccounts = allAccounts.filter((a) => linkedIds.has(a.id))
  linkedTransactions = allTransactions.filter((t) => linkedIds.has(t.accountId))
}
refresh()

function commit(nextIds) {
  linkedIds = nextIds
  refresh()
  version += 1
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...linkedIds]))
  } catch {
    // Not persisted; still works for this session.
  }
  listeners.forEach((listener) => listener())
}

export const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
export const getVersion = () => version

export function linkAccounts(accountIds) {
  commit(new Set([...linkedIds, ...accountIds.filter((id) => accountsById.has(id))]))
}

export function unlinkInstitution(institutionId) {
  commit(
    new Set(
      [...linkedIds].filter(
        (id) => accountsById.get(id).institutionId !== institutionId,
      ),
    ),
  )
}

// ---- reads ----------------------------------------------------------------

export const getUser = () => user
export const getCategories = () => categories

// Linked accounts and their transactions only.
export const getAccounts = () => linkedAccounts
export const getTransactions = () => linkedTransactions

// Lookups cover every account so a row never loses its labels.
export const getAccountById = (id) => accountsById.get(id)
export const getCategoryById = (id) => categoriesById.get(id)
export const getInstitutionById = (id) => institutionsById.get(id)

// Every institution with all of its linkable accounts and what is linked.
export function getInstitutions() {
  return institutions.map((institution) => {
    const accounts = allAccounts.filter((a) => a.institutionId === institution.id)
    return {
      ...institution,
      accounts,
      linkedAccounts: accounts.filter((a) => linkedIds.has(a.id)),
    }
  })
}

// Newest first; ties keep the data file's order (already newest first).
export function getRecentTransactions(limit = 5) {
  return [...linkedTransactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
}

// Date range of the whole dataset (the latest acts as "today"). Fixed so the
// analytics periods don't shift when accounts are linked.
const allDates = allTransactions.map((t) => t.date).sort()
export const getDateBounds = () => ({
  earliest: allDates[0],
  latest: allDates[allDates.length - 1],
})

export function getTotalBalance() {
  return linkedAccounts.reduce((sum, a) => sum + a.currentBalance, 0)
}

export function getTotalCreditLimit() {
  return linkedAccounts.reduce((sum, a) => sum + a.creditLimit, 0)
}

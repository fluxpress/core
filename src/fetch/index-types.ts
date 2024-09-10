export * from './issues-types.js'
export * from './users-types.js'

export type SupportDataTypes = keyof SupportDataTypesMap
export type SupportDataTypesMap = {
  issues: import('./issues-types.js').Issues
  users: import('./users-types.js').Users
}

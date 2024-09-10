import { SupportDataType, SupportDataTypesMap } from './index-types.js'
import { fetchIssues } from './issues.js'
import { fetchUsers } from './users.js'

type SupportDataTypesFetchFnMap = {
  [K in SupportDataType]: () => Promise<SupportDataTypesMap[K]>
}

const fetchFnMap: SupportDataTypesFetchFnMap = {
  issues: fetchIssues,
  users: fetchUsers,
}

export async function fetch<T extends SupportDataType>(
  dataType: T,
): Promise<SupportDataTypesMap[T]> {
  return await fetchFnMap[dataType]()
}

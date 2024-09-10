import { SupportDataTypes, SupportDataTypesMap } from './index-types.js'
import { fetchIssues } from './issues.js'
import { fetchUsers } from './users.js'

type SupportDataTypesFetchFnMap = {
  [K in SupportDataTypes]: () => Promise<SupportDataTypesMap[K]>
}

const fetchFnMap: SupportDataTypesFetchFnMap = {
  issues: fetchIssues,
  users: fetchUsers,
}

export async function fetch<T extends SupportDataTypes>(
  dataType: T,
): Promise<SupportDataTypesMap[T]> {
  return await fetchFnMap[dataType]()
}

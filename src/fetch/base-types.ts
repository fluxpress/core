export interface DataBase {
  version: string
  metadata: {
    fetch_time: string
    github: {
      owner: string
      repo: string
    }
  }
}

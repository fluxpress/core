import {
  fetchDataIssues,
  saveDataAsFile,
  DATA_PATH__ISSUES,
} from './dist/index.js'

const data = await fetchDataIssues()
console.log(data.version)
console.log(data.metadata)
console.log(data.issues.length)
console.log(data.labels.length)
console.log(data.milestones.length)
saveDataAsFile(DATA_PATH__ISSUES, data).then(() => {
  console.log('数据已保存在', DATA_PATH__ISSUES)
})

/* eslint-disable @typescript-eslint/no-var-requires */
import functionDefinitions from './functionDefinitions'

const shouldExport = (functionName: string): boolean => {
  const currentFunctionName = process.env.K_SERVICE
  return (
    currentFunctionName === undefined || currentFunctionName === functionName
  )
}

functionDefinitions.forEach((definition) => {
  switch (definition.type) {
    case 'single':
      if (shouldExport(definition.name)) {
        exports[definition.name] = require(definition.module)[
          definition.implementation
        ]
      }
      break

    case 'group': {
      const groupedFuncs = definition.functions.reduce((previous, current) => {
        const functionName = [definition.groupName, current.name].join('-')
        return shouldExport(functionName)
          ? {
              ...previous,
              [current.name]: require(current.module)[current.implementation],
            }
          : previous
      }, {})

      exports[definition.groupName] = groupedFuncs
      break
    }
  }
})

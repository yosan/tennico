type FunctionProperty = {
  name: string
  module: string
  implementation: string
}

type FunctionDefinition =
  | ({ type: 'single' } & FunctionProperty)
  | { type: 'group'; groupName: string; functions: FunctionProperty[] }

const functionDefinitions: FunctionDefinition[] = [
  {
    type: 'single',
    name: 'nextApp',
    module: './web',
    implementation: 'nextApp',
  },
  {
    type: 'group',
    groupName: 'firestore',
    functions: [
      {
        name: 'courtCreated',
        module: './firestore',
        implementation: 'courtCreated',
      },
      {
        name: 'courtUpdated',
        module: './firestore',
        implementation: 'courtUpdated',
      },
    ],
  },
]

export default functionDefinitions

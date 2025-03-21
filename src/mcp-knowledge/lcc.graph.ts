export const LCCKnowledgeGraph = {
  location: {
    coordinates: [-5.183566, -37.343722],
    facilities: [
      {
        name: 'Recepção Principal',
        services: ['Informações', 'Matrículas', 'Documentação'],
        access: 'Entrada Leste'
      }
    ],
    connections: [
      {
        to: 'Biblioteca Central',
        distance: 300,
        path: 'walking'
      }
    ]
  },
  sequentialPaths: [
    {
      id: 'novo-aluno',
      steps: [
        'Chegada ao LCC',
        'Recepção para credenciamento',
        'Orientações acadêmicas',
        'Tour pelo campus',
        'Integração digital'
      ]
    }
  ]
}; 
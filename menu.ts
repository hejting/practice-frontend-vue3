export const menu = [
  {
    name: 'three',
    label: 'three.js',
    child: [
      {
        name: 'solar',
        label: 'solar system'
      },
      {
        name: 'globe',
        label: 'globe'
      }
    ]
  }
]

export interface IMenuItem {
  name: string,
  label: string
}
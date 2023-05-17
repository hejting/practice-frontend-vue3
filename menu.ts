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
  },
  {
    name: 'map',
    label: 'map',
    child: [
      {
        name: 'baiduMap',
        label: 'baiduMap'
      }
    ]
  }
]

export interface IMenuItem {
  name: string,
  label: string
}
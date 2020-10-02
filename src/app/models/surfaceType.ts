export enum SurfaceType {
  omni = 'omni',
  clay = 'clay',
  hard = 'hard',
}

export const surfaceTypeName = (type: SurfaceType): string => {
  switch (type) {
    case SurfaceType.omni:
      return 'オムニ'
    case SurfaceType.clay:
      return 'クレー'
    case SurfaceType.hard:
      return 'ハード'
    default:
      return ''
  }
}

import 'react-redux'

declare global {
  interface Window {
    google: {
      maps: {
        LatLngBounds: () => void
        Size: (width: number, height: number) => void
      }
    }
  }
}

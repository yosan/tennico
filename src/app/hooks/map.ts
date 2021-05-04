import { fitBounds } from 'google-map-react'
import { CourtDoc } from 'models/court'
import { useMemo } from 'react'

export const useFitBounds = (
  courtDocs: CourtDoc[],
  enable: boolean
): { center: { lat: number; lng: number }; zoom: number } => {
  return useMemo(() => {
    if (!enable || !courtDocs || courtDocs.length === 0) {
      return {}
    }

    if (courtDocs.length === 1) {
      return {
        center: {
          lat: courtDocs[0].data.geo.latitude,
          lng: courtDocs[0].data.geo.longitude,
        },
        zoom: 16,
      }
    }

    const lats = courtDocs.map((court) => court.data.geo.latitude)
    const lngs = courtDocs.map((court) => court.data.geo.longitude)
    const bounds = {
      nw: {
        lat: Math.max(...lats),
        lng: Math.min(...lngs),
      },
      se: {
        lat: Math.min(...lats),
        lng: Math.max(...lngs),
      },
    }

    const size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight,
    }

    return fitBounds(bounds, size)
  }, [courtDocs])
}

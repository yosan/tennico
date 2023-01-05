import 'firebase/firestore'

import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from 'store'
import firebase from 'firebase/app'
import { Court } from 'models/court'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): ThunkDispatch<unknown, null, AnyAction> &
  ThunkDispatch<unknown, undefined, AnyAction> &
  Dispatch<AnyAction> => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useFirestoreCourt = (id: string) => {
  const [court, setCourt] = useState<Court | undefined>(undefined)

  useEffect(() => {
    firebase.firestore().collection('courts').doc(id).get().then((doc) => {
      setCourt(doc.data() as Court)  
    })
  }, [id, setCourt])

  return court
}
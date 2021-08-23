import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from 'store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): ThunkDispatch<unknown, null, AnyAction> &
  ThunkDispatch<unknown, undefined, AnyAction> &
  Dispatch<AnyAction> => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

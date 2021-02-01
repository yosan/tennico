import 'firebase/auth'

import { Button } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import firebase from 'firebase/app'
import { State } from 'models/type'
import React from 'react'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { FirebaseReducer, isEmpty, isLoaded } from 'react-redux-firebase'

type LoginStatus = 'loggedIn' | 'loggedOut' | 'unknown'

const LoggedIn: FC<Record<string, unknown>> = ({ children }) => {
  const auth: FirebaseReducer.AuthState = useSelector(
    (state: State) => state.firebase.auth
  )

  const logInStatus: LoginStatus = useMemo(() => {
    if (!isLoaded(auth)) {
      return 'unknown'
    } else if (isEmpty(auth)) {
      return 'loggedOut'
    } else {
      return 'loggedIn'
    }
  }, [auth])

  useEffect(() => {
    if (process.browser && logInStatus === 'loggedOut') {
      import('firebaseui').then((firebaseui) => {
        const ui = new firebaseui.auth.AuthUI(firebase.auth())
        ui.start('#firebaseui-auth-container', {
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: () => {
              ui.delete()
              return false
            },
          },
        })
      })
    }
  }, [logInStatus])

  const onLogOutClicked = useCallback(() => firebase.auth().signOut(), [])

  switch (logInStatus) {
    case 'loggedIn':
      return (
        <>
          {children}
          <Button
            variant="contained"
            color="primary"
            startIcon={<ExitToAppIcon />}
            onClick={onLogOutClicked}
            style={{ margin: '8px' }}
          >
            logout
          </Button>
        </>
      )
    case 'loggedOut':
      return <div id="firebaseui-auth-container" />
    case 'unknown':
      return <div>loading...</div>
  }
}

export default LoggedIn

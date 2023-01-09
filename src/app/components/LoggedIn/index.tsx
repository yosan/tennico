import 'firebase/auth'

import { Button } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import firebase from 'firebase/app'
import React, { useState } from 'react'
import { FC, useCallback, useEffect, useMemo } from 'react'

type LoginStatus = 'loggedIn' | 'loggedOut'

const LoggedIn: FC<Record<string, unknown>> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | undefined>(undefined)
  const logInStatus: LoginStatus = user == undefined ? 'loggedOut' : 'loggedIn'

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

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
  }
}

export default LoggedIn

import { Button } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import React, { useState } from 'react'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { User, getAuth, GoogleAuthProvider } from 'firebase/auth'
import {  } from 'firebase/analytics'

type LoginStatus = 'loggedIn' | 'loggedOut'

const LoggedIn: FC<Record<string, unknown>> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const logInStatus: LoginStatus = user == undefined ? 'loggedOut' : 'loggedIn'

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (process.browser && logInStatus === 'loggedOut') {
      import('firebaseui').then((firebaseui) => {
        const ui = new firebaseui.auth.AuthUI(getAuth())
        ui.start('#firebaseui-auth-container', {
          signInOptions: [GoogleAuthProvider.PROVIDER_ID],
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

  const onLogOutClicked = useCallback(() => getAuth().signOut(), [])

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

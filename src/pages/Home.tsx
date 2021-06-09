import * as React from 'react'

import { useKeycloak } from '@react-keycloak/web'
import { useState } from 'react'

export function HomePage () {
  const { keycloak } = useKeycloak()
  const [showToken, setShowToken] = useState(false)

  const callApi = () => {
    setShowToken(true)
    console.log(keycloak?.token)
    console.log(keycloak?.tokenParsed)
  }

  return (
    <div>
      <div>
      <div>
        User is {!keycloak?.authenticated ? 'NOT ' : ''} authenticated</div>
        {!!keycloak?.authenticated && (
          <button type="button" onClick={() => keycloak.logout()}>
            Logout
          </button>
        )}

        <button type="button" onClick={callApi}>
          Show token and details
        </button>
      </div>
      <div>
        {showToken && (
          <div style={{padding: '1em'}}>
            <strong>JWT Token:</strong>
            <p>{JSON.stringify(keycloak?.token || '')}</p>
            <strong>JWT content: </strong>
            <p>{JSON.stringify(keycloak?.tokenParsed || {})}</p>
          </div>
        )}
      </div>
    </div>
  )
}

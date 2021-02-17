import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Overview } from '../Overview'

export const Content = () => {
  return (
    <Switch>
      <Route path='/overview'>
        <Overview />
      </Route>
      <Route path='/new'>New</Route>
    </Switch>
  )
}

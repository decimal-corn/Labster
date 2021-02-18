import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Overview } from '../Overview'
import { DictionaryForm } from '../DictionaryForm'

export const Content = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Overview />
      </Route>
      <Route path='/new'>
        <DictionaryForm />
      </Route>
      <Route path='/edit/:id'>
        <DictionaryForm />
      </Route>
    </Switch>
  )
}

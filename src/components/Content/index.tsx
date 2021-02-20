import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Overview } from '../Overview'
import { DictionaryForm } from '../DictionaryForm'

export const Content = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Overview />
      </Route>
      <Route path={['/new', '/edit/:id']}>
        <DictionaryForm />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}

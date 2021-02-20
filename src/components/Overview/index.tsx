import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDictionaries } from '../../selectors'
import { Button, Card, CardColumns, Modal } from 'react-bootstrap'
import { remove } from '../../store'
import { DictionaryCard } from './DictionaryCard'
import { Link } from 'react-router-dom'

export const Overview = () => {
  const dictionaries = useSelector(getDictionaries)
  const dispatch = useDispatch()

  const [removingDictionary, setRemovingDictionary] = useState<
    string | undefined
  >()

  const onDictionaryRemove = useCallback((id: string) => {
    dispatch(remove({ id }))
  }, [])

  return (
    <>
      <Card className='border-secondary'>
        <Card.Header className='bg-secondary text-white'>Overview</Card.Header>
        <Card.Body className='bg-light'>
          <CardColumns>
            {Object.keys(dictionaries).map((key) => (
              <DictionaryCard
                key={key}
                dictionaryKey={key}
                setRemovingDictionary={setRemovingDictionary}
              />
            ))}
          </CardColumns>
          {!Object.keys(dictionaries).length && (
            <Card>
              <Card.Body>
                <Card.Title>There are no dictonaries</Card.Title>
                <Button as={Link} to='/new'>
                  Create one
                </Button>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
      {removingDictionary && (
        <Modal show={true} onHide={() => setRemovingDictionary(undefined)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`Confirm removing the "${dictionaries[removingDictionary].name}" dictionary`}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => setRemovingDictionary(undefined)}
            >
              Cancel
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                setRemovingDictionary(undefined)
                onDictionaryRemove(removingDictionary)
              }}
            >
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

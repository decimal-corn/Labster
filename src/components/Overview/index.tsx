import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDictionaries } from '../../store/selectors'
import { Button, Card, CardColumns, Modal } from 'react-bootstrap'
import { removeDictionary } from '../../store/store'
import { DictionaryCard } from './DictionaryCard'
import { Link } from 'react-router-dom'

export const Overview = () => {
  const dictionaries = useSelector(getDictionaries)
  const dispatch = useDispatch()

  const [removingDictionaryKey, setRemovingDictionaryKey] = useState<
    string | undefined
  >()

  const closeModal = useCallback(() => setRemovingDictionaryKey(undefined), [
    setRemovingDictionaryKey,
  ])

  const onDictionaryRemoveConfirm = useCallback(() => {
    if (!removingDictionaryKey) {
      // Impossible, but covering this case for type safety
      return
    }
    closeModal()
    dispatch(removeDictionary({ id: removingDictionaryKey }))
  }, [removingDictionaryKey])

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
                setRemovingDictionaryKey={setRemovingDictionaryKey}
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
      {removingDictionaryKey && (
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`Confirm removing the "${dictionaries[removingDictionaryKey].name}" dictionary`}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>
              Cancel
            </Button>
            <Button variant='danger' onClick={onDictionaryRemoveConfirm}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

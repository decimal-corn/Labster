import React from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDictionaries } from '../../store/selectors'

type Props = {
  dictionaryKey: string
  setRemovingDictionaryKey: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}

export const DictionaryCard = ({
  dictionaryKey,
  setRemovingDictionaryKey,
}: Props) => {
  const dictionaries = useSelector(getDictionaries)
  return (
    <Card className='mb-3 border-primary' key={dictionaryKey}>
      <Card.Header className='bg-primary text-white' as='h5'>
        {dictionaries[dictionaryKey].name}
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {dictionaries[dictionaryKey].data.map((row) => (
              <tr key={row.from + row.to}>
                <td>{row.from}</td>
                <td>{row.to}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer>
        <Button
          variant='primary'
          className='mr-2'
          as={Link}
          to={`/edit/${dictionaryKey}`}
        >
          Edit
        </Button>
        <Button
          variant='danger'
          onClick={() => setRemovingDictionaryKey(dictionaryKey)}
        >
          Remove
        </Button>
      </Card.Footer>
    </Card>
  )
}

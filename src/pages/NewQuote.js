import QuoteForm from '../components/quotes/QuoteForm'
import { useHistory } from 'react-router-dom'
import useHttp from '../hooks/hooks/use-http'
import { addQuote } from '../lib/lib/api'
import { useEffect } from 'react'

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote)
  const history = useHistory()

  useEffect(() => {
    if (status === 'completed') {
      history.push('/quotes')
    }
  }, [status, history])

  const AddQuoteHandler = (quoteData) => {
    sendRequest(quoteData)
  }

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={AddQuoteHandler} />
  )
}

export default NewQuote

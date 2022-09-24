import QuoteList from '../components/quotes/QuoteList'
import useHttp from '../hooks/hooks/use-http'
import { getAllQuotes } from '../lib/lib/api'
import { useEffect } from 'react'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import NoQuotesFound from '../components/quotes/NoQuotesFound'

// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'Max', text: 'Learning React is fun' },
//   { id: 'q2', author: 'Maxiwilliam', text: 'Learning React is great' },
// ]

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true)

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className='centered focused'>{error}</p>
  }

  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />
  }

  return <QuoteList quotes={loadedQuotes} />
}

export default AllQuotes

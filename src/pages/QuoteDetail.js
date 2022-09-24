import React, { Fragment, useEffect } from 'react'
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import useHttp from '../hooks/hooks/use-http'
import { getSingleQuote } from '../lib/lib/api'

// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'Max', text: 'Learning React is fun' },
//   { id: 'q2', author: 'Maxiwilliam', text: 'Learning React is great' },
// ]

const QuoteDetail = () => {
  const match = useRouteMatch()
  const params = useParams()

  const { quoteId } = params

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote)

  // console.log(match)
  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId)

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

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

  if (!loadedQuote) {
    return <p>No quote found !</p>
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* <Route path={`/quotes/${params.quoteId}`} exact> */}
      <Route path={`${match.path}`} exact>
        <div className='centered'>
          {/* <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}> */}
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  )
}

export default QuoteDetail

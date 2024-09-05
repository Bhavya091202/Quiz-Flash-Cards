import React from 'react'
import FlashCard from './flashcard'

export default function flashCardList( {   flashCards   } ) {

    return (
    <div className = "card-grid">
        {flashCards.map(
            flashCard => {
                return <FlashCard flashCard={flashCard} key={flashCard.id} />
            }
        )}

    </div>
  )
}


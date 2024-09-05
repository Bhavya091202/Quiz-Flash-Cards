import React, { useState, useEffect, useRef } from 'react';

const FlashCard = ( { flashCard } ) => {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');

    const frontEl = useRef();
    const backEl = useRef();

    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight( Math.max( frontHeight, backHeight, 100 ) );
    }

    useEffect(
        setMaxHeight, 
        [flashCard.question, flashCard.answer, flashCard.options]
    );

    useEffect(() => {
            window.addEventListener('resize', setMaxHeight);
            return () => window.removeEventListener('resize', setMaxHeight);
        },
        []
    );

    return (
            <div 
                className={`card ${flip ? 'flip' : ''}`}
                style={ { height: height } }
                onClick={ () => setFlip(!flip) }
                >
                <div className='front' ref={frontEl}>
                    {flashCard.question}
                    {flashCard.options.map( 
                        (option, index) => (
                            <div key={index} className= "flashcard-option"> {option} </div> 
                        )
                    )}
                </div>
                <div className='back' ref={backEl}>
                        {flashCard.answer}
                </div>
            </div>
      // {flip? flashCard.answer : flashCard.question} */}
    );
}

export default FlashCard;
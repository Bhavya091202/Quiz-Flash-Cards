import React, { useState, useEffect, useRef } from 'react';
import FlashCardList from './components/flashcardlist';

const App = () => {
    const [flashCards, setFlashCards] = useState([]);
    const [categories, setCategories] = useState([]);

    const categoryEl = useRef();
    const amountEl = useRef();

    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
        .then( res => res.json())
        .then( data => {
            // console.log(data);
            setCategories(data.trivia_categories)
        })
    }, []);
    
    const decodeString = (str) => {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = str;
        return textArea.value;
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://opentdb.com/api.php?category=${amountEl.current.value}&amount=${categoryEl.current.value}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);  // Check the entire structure
            setFlashCards(
                data.results.map(
                    (questionItem, index) => {
                        const answer = decodeString(questionItem.correct_answer);
                        const option = [ ...questionItem.incorrect_answers.map(a => decodeString(a)), answer ];
                        return {
                            id: `${index}-${Date.now()}`,
                            question: decodeString(questionItem.question),
                            answer: answer,
                            options: option.sort(() => Math.random() - 0.5)
                        }
                    }
                )
            )
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    return (
        <>
            <form className='header' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" ref={categoryEl}>
                        {
                            categories.map(category =>
                                <option value={category.id} key={category.id}>{category.name}</option>
                            )
                        }
                    </select> 
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Number of Questions</label>
                    <input type="number" id="amount" name="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
                </div>
                <div className="form-group">
                    <button className="btn">Generate</button>
                </div>
            </form>
            <div className='container'>
                <FlashCardList flashCards={flashCards} />
            </div>
        </>
    )
}

export default App;
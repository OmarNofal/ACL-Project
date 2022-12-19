import React, { useState } from 'react';

export default function Quiz() {
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	let questionsString="";
	for(let i=0;i<questions.length;i++){
		questionsString=questionsString+'\n';
		for(let j=0;j<questions[i]["answerOptions"].length;j++){
			if(questions[i]["answerOptions"][j]["isCorrect"]){
				let k=i+1
				questionsString=questionsString+questions[i]["questionText"]+" "+questions[i]["answerOptions"][j]["answerText"] ;
				if(j!=questions[i]["answerOptions"].length-1){
					questionsString=questionsString+', ';
	
				}
	
			}
			
		}
	}
  

    const resetStateClick =()=>{
        setRecordedScore(score)
        setCurrentQuestion (0)
        setShowScore(false)
        setScore(0)
		setShowSolutions(false)
    }

   
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
    const [showSolutions, setShowSolutions] = useState(false);
	const [score, setScore] = useState(0);	
    const [recordedScore, setRecordedScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
            setShowSolutions(true);
		}
	};
	return (
		<div className='app'>
           
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length} <br></br>
					The solutions are: <br></br> {questionsString} <br></br>
                    <button onClick={resetStateClick}>Retry</button>
                    
				</div>
                
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
                    
                    <div>
                        <p>Your Last Score: {recordedScore}</p>
                    </div>
				</>
			)}
		</div>
	);
}
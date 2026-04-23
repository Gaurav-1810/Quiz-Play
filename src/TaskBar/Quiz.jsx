import React from 'react';
const img1 = "/images/quiz.jpeg";
const img2 = "/images/quiz-completed.jpeg";

const QUESTIONS_DATA = {
    1: [
        { q: "What is 5 + 7?", a: ["10", "12", "14", "15"], correct: 1 },
        { q: "Capital of India?", a: ["Mumbai", "Delhi", "Kolkata", "Chennai"], correct: 1 },
        { q: "Red Planet is?", a: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
        { q: "Rainbow has how many colors?", a: ["5", "6", "7", "8"], correct: 2 },
        { q: "Smallest prime number?", a: ["0", "1", "2", "3"], correct: 2 },
    ],
    2: [
        { q: "who is the developer of this website?", a: ["Narendra Modi", "Elon Musk", "Rahul Gandhi", "Gaurav Mehra"], correct: 3 },
        { q: "Who wrote Romeo and Juliet?", a: ["Shakespeare", "Milton", "Dante", "Goethe"], correct: 0 },
        { q: "Currency of Japan?", a: ["Yuan", "Yen", "Won", "Dollar"], correct: 1 },
        { q: "Largest ocean?", a: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
        { q: "Boiling point of water?", a: ["90°C", "100°C", "110°C", "120°C"], correct: 1 },
        { q: "Fastest land animal?", a: ["Lion", "Cheetah", "Tiger", "Horse"], correct: 1 },
        { q: "Chemical symbol for Gold?", a: ["Ag", "Fe", "Au", "Cu"], correct: 2 },
        { q: "Adult human bones?", a: ["204", "206", "208", "210"], correct: 1 },
        { q: "Longest river?", a: ["Amazon", "Nile", "Ganges", "Yangtze"], correct: 1 },
        { q: "Square root of 144?", a: ["10", "11", "12", "13"], correct: 2 },
        { q: "First man on moon?", a: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Elon Musk"], correct: 1 },
    ]
};

export default function Quiz({ quizState, handleStartQuiz, handleAnswer, feedback, startNextLevel, resetQuiz, news, balance }) {
    if (!quizState.started) {
        return (
            <div className="text-center py-6 sm:py-10 animate-fadeIn space-y-4">
                <marquee scrollAmount="12" direction="left" className="text-md sm:text-lg text-blue-600 mb-6">{news}</marquee>
                <marquee scrollAmount="15" direction="left" className="text-md sm:text-lg text-purple-500 mb-6">{news}</marquee>
                <img src={img1} alt="Quiz Start" className="w-full max-w-xs mx-auto h-24 sm:h-32 object-cover rounded-lg shadow-md" />
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">Intellectual Challenge</h3>
                <p className="text-gray-600 mb-8">Participate in our knowledge-based evaluation to earn TATA loyalty points.</p>
                <button onClick={handleStartQuiz} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-200">
                    🚀 Start Level 1
                </button>
            </div>
        );
    }

    if (quizState.isFinished) {
        return (
            <div className="text-center py-10 animate-scaleUp">
                <img src={img2} alt="Quiz Completed" className="w-full max-w-xs mx-auto h-24 sm:h-32 object-cover rounded-lg shadow-md mb-4" />
                <div className="text-5xl sm:text-6xl mb-4">🎉</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Level {quizState.level} Completed!</h3>
                <p className="text-4xl font-black text-purple-600 my-4">Score: {quizState.score}</p>
                {quizState.level === 1 ? (
                    <button onClick={startNextLevel} className="bg-purple-600 text-white px-8 py-2 rounded-md font-bold hover:bg-purple-700 transition-all">
                        Unlock Level 2
                    </button>
                ) : (
                    <button onClick={resetQuiz} className="bg-gray-800 text-white px-8 py-2 rounded-md font-bold hover:bg-gray-900 transition-all">
                        Finish & Claim Reward
                    </button>
                )}
            </div>
        );
    }

    const currentQuestions = QUESTIONS_DATA[quizState.level];
    const currentQ = currentQuestions[quizState.currentQuestion];
    const progress = ((quizState.currentQuestion) / currentQuestions.length) * 100;

    return (
        <div className="animate-slideIn">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-purple-600 uppercase tracking-widest">Level {quizState.level}</span>
                <span className="text-sm text-gray-500">Question {quizState.currentQuestion + 1}/{currentQuestions.length}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-8">{currentQ.q}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.a.map((option, index) => {
                    let buttonStyle = "p-4 text-left border-2 rounded-xl transition-all group relative overflow-hidden ";
                    if (feedback) {
                        if (index === currentQ.correct) buttonStyle += "border-green-500 bg-green-50 text-green-700 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                        else if (feedback.index === index && !feedback.isCorrect) buttonStyle += "border-red-500 bg-red-50 text-red-700";
                        else buttonStyle += "border-gray-100 opacity-50";
                    } else buttonStyle += "border-gray-100 hover:border-purple-500 hover:bg-purple-50";
                    return (
                        <button key={index} onClick={() => handleAnswer(index, currentQuestions)} disabled={!!feedback} className={buttonStyle}>
                            <span className={`font-semibold ${!feedback && "text-gray-700 group-hover:text-purple-700"}`}>{option}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
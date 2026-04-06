import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('home');
    const [balance, setBalance] = useState(0);
    const [quizState, setQuizState] = useState({
        level: 1,
        currentQuestion: 0,
        score: 0,
        isFinished: false,
        started: false
    });
    const [feedback, setFeedback] = useState(null); // { index: number, isCorrect: boolean }


    const questions = {
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

    const handleAnswer = (index) => {
        if (feedback) return; // Prevent multiple clicks during feedback

        const isCorrect = index === questions[quizState.level][quizState.currentQuestion].correct;
        setFeedback({ index, isCorrect });

        if (isCorrect) {
            setBalance(prev => prev + 5);
            toast.success("Congratulations! You earned ₹5");
        }

        setTimeout(() => {
            const nextScore = isCorrect ? quizState.score + 10 : quizState.score;
            const nextQuestion = quizState.currentQuestion + 1;

            if (nextQuestion < questions[quizState.level].length) {
                setQuizState({ ...quizState, currentQuestion: nextQuestion, score: nextScore });
            } else {
                setQuizState({ ...quizState, score: nextScore, isFinished: true });
            }
            setFeedback(null);
        }, 1000);
    };

    const startNextLevel = () => {
        setQuizState({
            level: 2,
            currentQuestion: 0,
            score: quizState.score,
            isFinished: false,
            started: true
        });
    };

    const resetQuiz = () => {
        setQuizState({ level: 1, currentQuestion: 0, score: 0, isFinished: false, started: false });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <div className="space-y-6">
                        <marquee scrollAmount="15" direction="left" className="text-lg text-purple-500 mb-6">Welcome to your dashboard! Check your balance and take on quiz challenges to earn more rewards.</marquee>

                        <h3 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-3">Account Overview</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-500">Available Balance</p>
                                <p className="text-3xl font-extrabold text-purple-600 mt-1">₹{balance.toLocaleString()}</p>
                            </div>
                            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-500">Last Transaction Status</p>
                                <p className="text-3xl font-extrabold text-purple-600 mt-1">Success</p>
                            </div>
                        </div>
                    </div>
                );
            case 'quiz':
                if (!quizState.started) {
                    return (
                        <div className="text-center py-10 animate-fadeIn space-y-4">
                            <marquee scrollAmount="15" direction="left" className="text-lg text-purple-500 mb-6">Welcome to your dashboard! Check your balance and take on quiz challenges to earn more rewards.</marquee>

                            <img src="./public/Auth/quiz.jpeg" alt="Quiz Start" className="w-full max-w-xs mx-auto h-32 object-cover rounded-lg shadow-md" />
                            <h3 className="text-3xl font-bold text-purple-700 mb-4">Quiz Challenge</h3>
                            <p className="text-gray-600 mb-8">Test your knowledge and earn money rewards!</p>
                            <button onClick={() => setQuizState({ ...quizState, started: true })}
                                className="bg-purple-600 text-white px-10 py-3 rounded-full font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200">
                                Start Level 1
                            </button>
                        </div>
                    );
                }

                if (quizState.isFinished) {
                    return (
                        <div className="text-center py-10 animate-scaleUp">
                            <img src="./public/Auth/quiz-completed.jpeg" alt="Quiz Completed" className="w-full max-w-xs mx-auto h-32 object-cover rounded-lg shadow-md mb-4" />
                            <div className="text-6xl mb-4">🎉</div>
                            <h3 className="text-2xl font-bold text-gray-800">Level {quizState.level} Completed!</h3>
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

                const currentQ = questions[quizState.level][quizState.currentQuestion];
                const progress = ((quizState.currentQuestion) / questions[quizState.level].length) * 100;

                return (
                    <div className="animate-slideIn">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-purple-600 uppercase tracking-widest">Level {quizState.level}</span>
                            <span className="text-sm text-gray-500">Question {quizState.currentQuestion + 1}/{questions[quizState.level].length}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
                            <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-8">{currentQ.q}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQ.a.map((option, index) => {
                                let buttonStyle = "p-4 text-left border-2 rounded-xl transition-all group relative overflow-hidden ";

                                if (feedback) {
                                    if (index === currentQ.correct) {
                                        buttonStyle += "border-green-500 bg-green-50 text-green-700 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                                    } else if (feedback.index === index && !feedback.isCorrect) {
                                        buttonStyle += "border-red-500 bg-red-50 text-red-700";
                                    } else {
                                        buttonStyle += "border-gray-100 opacity-50";
                                    }
                                } else {
                                    buttonStyle += "border-gray-100 hover:border-purple-500 hover:bg-purple-50";
                                }

                                return (
                                    <button key={index} onClick={() => handleAnswer(index)} disabled={!!feedback} className={buttonStyle}>
                                        <span className={`font-semibold ${!feedback && "text-gray-700 group-hover:text-purple-700"}`}>{option}</span>
                                        {!feedback && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                ➡️
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            case 'withdraw':
                return <div className="p-10 border-2 border-dashed border-gray-300 text-center text-gray-600 text-2xl italic">Withdrawal ka Option dekhte hi aa gye Withdrawal krne 🤬.</div>;
            case 'deposit':
                return <div className="p-10 border-2 border-dashed border-gray-300 text-center text-2xl text-gray-600 italic">Deposit TOH krne se rhe aap log 😒...
                    <img src="./public/Auth/qr.jpeg" alt="Deposit" className="w-160 h-150  rounded-lg shadow-md mb-4" />
                </div>;
            case 'support':
                return <div className="p-10 border-2 border-dashed border-gray-300 text-center text-red-600 text-2xls italic">
                    <img src="./public/Auth/gm.jpeg" alt="" />
                    For support, please contact our team @GauravMehra. </div>;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-purple-50 font-sans text-gray-800">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col shadow-md">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold text-purple-700">Dashboard</h2>
                    <p className="text-xs text-gray-500 mt-1">Welcome back!</p>
                </div>
                <nav className="flex-1 space-y-2">
                    <button onClick={() => setActiveTab('home')} className={`w-full text-left px-4 py-2 rounded-md transition-all ${activeTab === 'home' ? 'bg-purple-600 text-white font-semibold shadow-md' : 'hover:bg-purple-100 hover:text-purple-700'}`}>Home</button>
                    <button onClick={() => setActiveTab('quiz')} className={`w-full text-left px-4 py-2 rounded-md transition-all ${activeTab === 'quiz' ? 'bg-purple-600 text-white font-semibold shadow-md' : 'hover:bg-purple-100 hover:text-purple-700'}`}>Quiz Tasks</button>
                    <button onClick={() => setActiveTab('withdraw')} className={`w-full text-left px-4 py-2 rounded-md transition-all ${activeTab === 'withdraw' ? 'bg-purple-600 text-white font-semibold shadow-md' : 'hover:bg-purple-100 hover:text-purple-700'}`}>Withdraw</button>
                    <button onClick={() => setActiveTab('deposit')} className={`w-full text-left px-4 py-2 rounded-md transition-all ${activeTab === 'deposit' ? 'bg-purple-600 text-white font-semibold shadow-md' : 'hover:bg-purple-100 hover:text-purple-700'}`}>Deposit</button>
                    <button onClick={() => setActiveTab('support')} className={`w-full text-left px-4 py-2 rounded-md transition-all ${activeTab === 'support' ? 'bg-purple-600 text-white font-semibold shadow-md' : 'hover:bg-purple-100 hover:text-purple-700'}`}>Customer Support</button>
                </nav>
            </div>
            {/* Main Content Area */}
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-purple-700 mb-4">Developed by Gaurav Mehra</h2>
                    <header className="mb-8 flex justify-between items-end border-b border-gray-300 pb-4">
                        <h1 className="text-3xl font-extrabold text-gray-900">Unlimited Money Hack</h1>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded border border-gray-300">Status: Active</span>
                    </header>
                    <main className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Home from './TaskBar/home';
import Quiz from './TaskBar/Quiz';
import Withdraw from './TaskBar/Withdraw';
import Deposit from './TaskBar/deposit';
import Machine from './TaskBar/machine';
import Support from './TaskBar/Support';

const img1 = "/images/quiz.jpeg";
const img2 = "/images/quiz-completed.jpeg";
const img3 = "/images/QR1.jpeg";
const img4 = "/images/img4.png";

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

const DEPOSIT_LINKS = {
    300: 'https://rzp.io/rzp/oHhUqDn',
    400: 'https://rzp.io/rzp/Xpym4v0',
    500: 'https://rzp.io/rzp/d9hKw2p',
    600: 'https://rzp.io/rzp/uRWblqm',
    700: 'https://rzp.io/rzp/mGWB1MLE',
    800: 'https://rzp.io/rzp/hQrpHQx',
    900: 'https://rzp.io/rzp/huzZpWt6',
    1000: 'https://rzp.io/rzp/u9uuezAh',
};

const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'quiz', label: 'Quiz Tasks', icon: '🎯' },
    { id: 'withdraw', label: 'Withdraw', icon: '💰' },
    { id: 'deposit', label: 'Deposit', icon: '💳' },
    { id: 'machine', label: 'Machine', icon: '⚙️' },
    { id: 'support', label: 'Support', icon: '🎧' },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('home');
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState("");
    const [quizState, setQuizState] = useState({
        level: 1,
        currentQuestion: 0,
        score: 0,
        isFinished: false,
        started: false
    });
    const [withdrawForm, setWithdrawForm] = useState({
        accountNo: '',
        holderName: '',
        ifsc: '',
        amount: ''
    });
    const [depositForm, setDepositForm] = useState({
        amount: '',
        utr: ''
    });
    const [feedback, setFeedback] = useState(null); // { index: number, isCorrect: boolean }
    const [hasMachine400, setHasMachine400] = useState(false);

    useEffect(() => {
        const loadDashboard = async () => {
            // Simulating API response delay
            await new Promise(r => setTimeout(r, 1200));
            setBalance(1);
            setUser({ name: "Vandita", status: "Verified Member" });
            setNews("Welcome to TATA Group Digital Rewards. Complete quiz tasks to earn professional incentives. Secure withdrawals enabled.");
            setBalance(150);
            setUser({ name: "Vandita", status: "Active" });
            setNews("Welcome to your dashboard! Earn ₹30 for every correct answer. Check your balance and start winning!");
            setLoading(false);
        };
        loadDashboard();
    }, []);

    const handleAnswer = (index, currentQuestions) => {
        if (feedback) return; // Prevent multiple clicks during feedback

        const isCorrect = index === currentQuestions[quizState.currentQuestion].correct;
        setFeedback({ index, isCorrect });

        if (isCorrect) {
            setBalance(prev => prev + 30);
            toast.success("Congratulations! You earned ₹30 for the correct answer!");
        } else {
            toast.error("Oops! Incorrect answer. Try the next one!");
            setBalance(prev => prev + 5);
            toast.success("Congratulations! You earned ₹5");
        }

        setTimeout(() => {
            const nextScore = isCorrect ? quizState.score + 10 : quizState.score;
            const nextQuestion = quizState.currentQuestion + 1;

            if (nextQuestion < currentQuestions.length) {
                setQuizState({ ...quizState, currentQuestion: nextQuestion, score: nextScore });
            } else {
                setQuizState({ ...quizState, score: nextScore, isFinished: true });
            }
            setFeedback(null);
        }, 1000);
    };

    const startNextLevel = () => {
        setQuizState({
            ...quizState,
            level: quizState.level + 1,
            currentQuestion: 0,
            isFinished: false,
            started: true
        });
    };

    const resetQuiz = () => {
        setQuizState({ level: 1, currentQuestion: 0, score: 0, isFinished: false, started: false });
    };

    const handleStartQuiz = () => {
        setQuizState({ ...quizState, started: true });
    };

    const triggerUPI = () => {
        const { amount } = depositForm;
        if (!amount || parseFloat(amount) <= 0) {
            toast.error("कृपया भुगतान के लिए सही राशि दर्ज करें।");
            return;
        }
        
        // Redirect to Razorpay payment link
        const link = DEPOSIT_LINKS[amount] || 'https://rzp.io/rzp/oHhUqDn';
        window.open(link, '_blank');
    };

    const handleDeposit = () => {
        const { amount, utr } = depositForm;
        if (!amount || !utr) {
            toast.error("कृपया राशि और UTR नंबर दर्ज करें।");
            return;
        }
        if (utr.length < 12) {
            toast.error("कृपया सही 12-अंकों का UTR दर्ज करें।");
            return;
        }

        toast.info("आपके भुगतान की पुष्टि की जा रही है...");
        setTimeout(() => {
            const addedAmount = parseFloat(amount);
            setBalance(prev => prev + addedAmount);
            toast.success(`सफलतापूर्वक ₹${addedAmount} आपके बैलेंस में जोड़ दिए गए हैं!`);
            setDepositForm({ amount: '', utr: '' });
            setActiveTab('home');
        }, 2500);
    };

    const handleBuyMachine = (machine) => {
        if (balance < machine.price) {
            toast.error(`Insufficient balance! Is machine ke liye ₹${machine.price} chahiye.`);
            setActiveTab('deposit'); // Kam balance hone par deposit page par bhejen
            return;
        }

        setBalance(prev => prev - machine.price);
        if (machine.price === 400) {
            setHasMachine400(true);
        }
        toast.success(`Success! ₹${machine.price} deduct hue aur Machine #${machine.id} buy ho gayi.`);
    };

    const handleWithdrawSubmit = (e) => {
        e.preventDefault();
        const { accountNo, holderName, ifsc, amount } = withdrawForm;
        const withdrawAmount = parseFloat(amount);

        if (!accountNo || !holderName || !ifsc || !amount) {
            toast.error("Please fill all bank details and amount.");
            return;
        }

        if (!hasMachine400) {
            toast.error("पहले 400 rp वाली मशीन buy करो तब withdrawal होगा");
            setActiveTab('machine');
            return;
        }

        if (withdrawAmount > balance) {
            toast.error("Insufficient balance for withdrawal!");
            return;
        }

        if (withdrawAmount < 100) {
            toast.error("Minimum withdrawal amount is ₹100.");
            return;
        }

        toast.info("Withdrawal request submitted! Processing...");
        setTimeout(() => {
            setBalance(prev => prev - withdrawAmount);
            toast.success(`₹${withdrawAmount} successfully withdrawn to your bank account!`);
            setWithdrawForm({ accountNo: '', holderName: '', ifsc: '', amount: '' });
        }, 2000);
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-500 font-medium">Fetching dashboard data...</p>
                </div>
            );
        }

        switch (activeTab) {
            case 'home':
                return <Home news={news} balance={balance} />;
            case 'quiz':
                return <Quiz quizState={quizState} handleStartQuiz={handleStartQuiz} handleAnswer={handleAnswer} feedback={feedback} startNextLevel={startNextLevel} resetQuiz={resetQuiz} news={news} balance={balance} />;
            case 'withdraw':
                return <Withdraw withdrawForm={withdrawForm} setWithdrawForm={setWithdrawForm} handleWithdrawSubmit={handleWithdrawSubmit} balance={balance} />;
            case 'deposit':
                return <Deposit depositForm={depositForm} setDepositForm={setDepositForm} triggerUPI={triggerUPI} handleDeposit={handleDeposit} />;
            case 'machine':
                return <Machine balance={balance} handleBuyMachine={handleBuyMachine} />;
            case 'support':
                return <Support />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-purple-50 font-sans text-gray-800">
            {/* Sidebar Navigation */}
            <div className="w-20 lg:w-72 bg-white border-r border-gray-100 p-2 lg:p-6 flex flex-col shadow-2xl z-10 transition-all duration-300">
                <div className="mb-10 text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl lg:text-3xl font-black mb-2 lg:mb-4 shadow-lg shadow-purple-200 rotate-3 hover:rotate-0 transition-transform duration-300">
                        QP
                    </div>
                    <div className="hidden lg:block">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">QuizPlay Pro</h2>
                        <p className="text-[10px] text-purple-500 font-bold uppercase tracking-widest mt-1">Member Dashboard</p>
                    </div>
                </div>
                <nav className="flex-1 space-y-3">
                    {NAV_ITEMS.map((item) => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)} 
                            className={`w-full flex items-center justify-center lg:justify-start lg:space-x-3 px-2 lg:px-4 py-3.5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                                activeTab === item.id 
                                ? 'bg-purple-600 text-white font-bold shadow-xl shadow-purple-200' 
                                : 'text-gray-400 hover:bg-purple-50 hover:text-purple-600'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm font-semibold hidden lg:block">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-50">
                    <button className="w-full flex items-center justify-center lg:justify-start lg:space-x-3 px-2 lg:px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 group">
                        <span className="text-xl group-hover:rotate-12 transition-transform">🚪</span>
                        <span className="text-sm font-bold hidden lg:block">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Bottom Navigation Bar - Visible only on Mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2 px-1 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                {NAV_ITEMS.map((item) => (
                    <button 
                        key={item.id} 
                        onClick={() => setActiveTab(item.id)} 
                        className={`flex flex-col items-center justify-center space-y-1 flex-1 py-2 rounded-xl transition-all ${
                            activeTab === item.id ? 'text-blue-700 bg-blue-50' : 'text-gray-400'
                        }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-4">Welcome, {user?.name || "Member"}</h2>
                    <header className="mb-8 flex justify-between items-end border-b border-gray-300 pb-4">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Member Dashboard</h1>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded border border-gray-300">
                            Status: {user?.status || "Loading..."}
                        </span>
                    </header>
                    <main className="bg-white p-4 sm:p-8 rounded-lg border border-gray-200 shadow-lg">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
}
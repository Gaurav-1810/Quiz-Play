import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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
                return (
                    <div className="space-y-6">
                        <marquee scrollAmount="12" direction="left" className="text-md sm:text-lg text-blue-600 font-medium mb-6">{news}</marquee>
                        <marquee scrollAmount="15" direction="left" className="text-md sm:text-lg text-purple-500 mb-6">{news}</marquee>

                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 border-b border-gray-300 pb-3">Account Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-500">Available Balance</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 mt-1">₹{balance.toLocaleString()}</p>
                            </div>
                            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-500">Last Transaction Status</p>
                                <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 mt-1">Success</p>
                            </div>
                        </div>
                    </div>
                );
            case 'quiz':
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

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
                                <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                            <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-8">{currentQ.q}</h3>

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
                                    buttonStyle += "border-gray-100 hover:border-blue-500 hover:bg-blue-50";
                                    buttonStyle += "border-gray-100 hover:border-purple-500 hover:bg-purple-50";
                                }

                                return (
                                    <button key={index} onClick={() => handleAnswer(index, currentQuestions)} disabled={!!feedback} className={buttonStyle}>
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
                return (
                    <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Withdraw Winnings</h3>
                            <p className="text-gray-500 text-sm">Enter your bank details to transfer your earnings.</p>
                        </div>

                        <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600">Account Holder Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all"
                                    placeholder="Enter Name"
                                    value={withdrawForm.holderName}
                                    onChange={(e) => setWithdrawForm({...withdrawForm, holderName: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600">Account Number</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-purple-500 outline-none transition-all"
                                    placeholder="Enter Account Number"
                                    value={withdrawForm.accountNo}
                                    onChange={(e) => setWithdrawForm({...withdrawForm, accountNo: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600">IFSC Code</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-purple-500 outline-none transition-all"
                                    placeholder="Enter IFSC (e.g. SBIN0001234)"
                                    value={withdrawForm.ifsc}
                                    onChange={(e) => setWithdrawForm({...withdrawForm, ifsc: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600">Withdrawal Amount (Min ₹100)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-purple-500 outline-none transition-all"
                                    placeholder="Enter Amount"
                                    value={withdrawForm.amount}
                                    onChange={(e) => setWithdrawForm({...withdrawForm, amount: e.target.value})}
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-4">
                                Withdraw Now (Balance: ₹{balance.toLocaleString()})
                            </button>
                        </form>
                    </div>
                );
                return <div className="p-10 border-2 border-dashed border-gray-300 text-center text-gray-600 text-2xl italic">Withdrawal ka Option dekhte hi aa gye Withdrawal krne 🤬.</div>;
            case 'deposit':
                return (
                    <div className="max-w-md mx-auto space-y-6 animate-fadeIn">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">डिपॉजिट फंड्स</h3>
                            <p className="text-gray-500 text-sm">राशि दर्ज करें और किसी भी UPI ऐप से भुगतान करें।</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2 justify-center mb-2">
                                {[300, 400, 500, 600, 700, 800, 900, 1000].map((amt) => (
                                    <button
                                        key={amt}
                                        onClick={() => {
                                            setDepositForm({ ...depositForm, amount: amt.toString() });
                                            window.open(DEPOSIT_LINKS[amt], '_blank');
                                        }}
                                        className="flex-1 min-w-[70px] py-2 bg-purple-50 border-2 border-purple-200 rounded-lg text-purple-700 font-bold hover:bg-purple-600 hover:text-white transition-all active:scale-95 shadow-sm"
                                    >
                                        ₹{amt}
                                    </button>
                                ))}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600">राशि (₹)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all"
                                    placeholder="बैलेंस दर्ज करें"
                                    value={depositForm.amount}
                                    onChange={(e) => setDepositForm({...depositForm, amount: e.target.value})}
                                />
                            </div>

                            <button onClick={triggerUPI} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-[0.98]">
                                📱 Pay via UPI App (Mobile Only)
                            </button>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 flex flex-col items-center">
                            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">या QR कोड स्कैन करें</p>
                            <img src={img3} alt="UPI QR Code" className="w-48 h-48 rounded-lg shadow-inner mb-4 bg-white p-2" />
                            <div className="text-center">
                                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">Business UPI ID</p>
                                <p className="text-lg font-mono font-bold text-blue-700">tata.digital@icici</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600">UTR / Transaction ID (अनिवार्य)</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none"
                                    placeholder="12 अंकों का UTR नंबर"
                                    value={depositForm.utr}
                                    onChange={(e) => setDepositForm({...depositForm, utr: e.target.value})}
                                />
                            </div>
                            <button onClick={handleDeposit} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
                                भुगतान की पुष्टि करें
                            </button>
                        </div>
                    </div>
                );
            case 'machine':
                const machines = [
                    { id: 1, price: 300, income: 800, days: 12 },
                    { id: 2, price: 400, income: 1200, days: 12 },
                    { id: 3, price: 500, income: 1800, days: 12 },
                    { id: 4, price: 1000, income: 2450, days: 12 },
                    { id: 5, price: 2000, income: 3050, days: 12 },
                ];
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                        {machines.map((m) => (
                            <div key={m.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                                <div className="h-40 bg-purple-100 flex items-center justify-center">
                                    {/* Yahan aap apni machine ki photo (img tags) laga sakte hain */}
                                    <span className="text-5xl group-hover:rotate-12 transition-transform duration-300">🚜</span>
                                </div>
                                <div className="p-5 space-y-3">
                                    <h4 className="text-lg font-bold text-gray-800 border-b pb-2">Earning Machine #{m.id}</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-center font-medium p-2 bg-gray-50 rounded-lg">
                                            <span className="text-gray-500">Machine Price:</span>
                                            <span className="text-purple-600 font-bold">₹{m.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center font-medium p-2 bg-gray-50 rounded-lg">
                                            <span className="text-gray-500">Per Day Income:</span>
                                            <span className="text-green-600 font-bold">₹{m.income}</span>
                                        </div>
                                        <div className="flex justify-between items-center font-medium p-2 bg-gray-50 rounded-lg">
                                            <span className="text-gray-500">Validity:</span>
                                            <span className="text-orange-600 font-bold">{m.days} Days</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleBuyMachine(m)}
                                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
                return <div className="p-10 border-2 border-dashed border-gray-300 text-center text-2xl text-gray-600 italic">Deposit TOH krne se rhe aap log 😒...
                    <img src={img3} alt="Deposit" className="w-160 h-150  rounded-lg shadow-md mb-4" />
                </div>;
            case 'support':
                return (
                    <div className="p-10 border-2 border-dashed border-gray-300 text-center text-red-600 text-2xl italic">
                        <p>For support, please contact our team @Vandita_Yadav.</p>
                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
                            <a href="https://t.me/+FfSnwVbqsFU5MWFl" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] hover:bg-[#0077b5] text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100 not-italic text-lg flex items-center gap-2">
                                ✈️ Telegram Channel 1
                            </a>
                            <a href="https://t.me/+FfSnwVbqsFU5MWFl" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] hover:bg-[#0077b5] text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100 not-italic text-lg flex items-center gap-2">
                                ✈️ Telegram Channel 2
                            </a>
                        </div>
                        <img src={img4} alt="Support" className="w-40 h-40 rounded-lg shadow-md mx-auto mt-4" />
                    </div>
                );
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
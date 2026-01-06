
import React, { useState, useEffect } from 'react';
import { Question, GameType } from '../types';
import { getEncouragement } from '../services/geminiService';
import sadDog from '../assets/sad-dog.png';
import funDog from '../assets/fun-dog.png';
import happySound from '../assets/happy-message-ping.mp3';
import incorrectSound from '../assets/sonar-ping.mp3';

const ClockFace: React.FC<{ hours: number; minutes: number; showResult?: boolean; isCorrect?: boolean }> = ({ hours, minutes, showResult, isCorrect }) => {
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;

  return (
    <div className={`relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full border-[12px] shadow-xl mx-auto flex items-center justify-center mb-8 transition-colors duration-300 ${showResult ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-blue-500'}`}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute font-kids text-xl md:text-2xl text-slate-600"
          style={{
            transform: `rotate(${(i + 1) * 30}deg) translateY(-110px) rotate(-${(i + 1) * 30}deg)`,
          }}
        >
          {i + 1}
        </div>
      ))}
      
      {/* Kim Giờ */}
      <div 
        className="absolute bottom-1/2 left-1/2 w-2.5 h-16 md:h-20 bg-slate-800 rounded-full origin-bottom z-10"
        style={{ 
          transform: `translateX(-50%) rotate(${hourDeg}deg)`,
          marginBottom: '0px' 
        }}
      ></div>
      
      {/* Kim Phút */}
      <div 
        className="absolute bottom-1/2 left-1/2 w-1.5 h-24 md:h-32 bg-red-500 rounded-full origin-bottom z-20"
        style={{ 
          transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
          marginBottom: '0px'
        }}
      ></div>

      {/* Chốt Giữa Đồng Hồ */}
      <div className="absolute w-5 h-5 bg-slate-800 rounded-full z-30 shadow-sm"></div>
      
      {showResult && (
        <div className="absolute top-[-20px] right-[-20px] text-6xl animate-bounce z-40">
          {isCorrect ? '✅' : '❌'}
        </div>
      )}
    </div>
  );
};

const generateClockQuestions = (): Question[] => {
  const qs: Question[] = [];
  for (let i = 0; i < 10; i++) {
    let h = Math.floor(Math.random() * 12) + 1;
    let m = 0;

    if (i < 4) m = 0;
    else if (i < 7) m = Math.random() > 0.5 ? 30 : 0;
    else m = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

    const timeString = `${h}:${m === 0 ? '00' : m}`;
    const optionsSet = new Set<string>([timeString]);
    while (optionsSet.size < 4) {
      const dh = Math.floor(Math.random() * 12) + 1;
      const dm = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      optionsSet.add(`${dh}:${dm === 0 ? '00' : dm}`);
    }

    qs.push({
      id: i,
      problem: `Mấy giờ rồi nhỉ?`,
      answer: timeString,
      options: Array.from(optionsSet).sort(),
      type: GameType.CLOCK
    });
  }
  return qs;
};

interface ClockGameProps {
  onFinish: (score: number) => void;
}

const ClockGame: React.FC<ClockGameProps> = ({ onFinish }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setQuestions(generateClockQuestions());
  }, []);

  useEffect(() => {
    if (showResult && selectedAnswer !== null) {
      const isCorrect = selectedAnswer === questions[currentIndex].answer;
      const audio = new Audio(isCorrect ? happySound : incorrectSound);
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [showResult, selectedAnswer, questions, currentIndex]);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    const correct = answer === questions[currentIndex].answer;
    if (correct) {
      setScore(prev => prev + 1);
    }
    setFeedback(getEncouragement(correct));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setFeedback("");
    if (currentIndex < 9) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinish(score);
    }
  };

  const currentQuestion = questions[currentIndex];

  if (questions.length === 0 || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4 text-center">
        <div className="animate-spin text-5xl">⏰</div>
        <p className="font-kids text-xl text-slate-500">Đang chuẩn bị...</p>
      </div>
    );
  }

  const [hStr, mStr] = (currentQuestion.answer as string).split(':');
  const h = parseInt(hStr);
  const m = parseInt(mStr);
  const isCorrect = selectedAnswer === currentQuestion.answer;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-4 bg-slate-100 rounded-full mb-8 overflow-hidden border-2 border-slate-200">
        <div 
          className="h-full bg-blue-400 transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
        ></div>
      </div>

      <ClockFace hours={h} minutes={m} showResult={showResult} isCorrect={isCorrect} />

      {/* {showResult && (
        <p className={`font-kids text-2xl mb-2 animate-bounce ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {feedback}
        </p>
      )} */}
      {showResult && !isCorrect && (
        <div className="w-16 h-16 mx-auto mb-3 rounded-full">
          <img className="rounded-full" src={sadDog} alt="" />
        </div>
      )}
      {showResult && isCorrect && (
        <div className="w-16 h-16 mx-auto mb-3rounded-full">
          <img className="rounded-full" src={funDog} alt="" />
        </div>
      )}

      <h2 className={`text-3xl font-kids mb-8 transition-colors ${showResult ? (isCorrect ? 'text-green-600' : 'text-red-500') : 'text-slate-800'}`}>
        {showResult ? (isCorrect ? `Đúng rồi: ${currentQuestion.answer}` : `Đáp án đúng: ${currentQuestion.answer}`) : currentQuestion.problem}
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        {currentQuestion.options.map((option: string, idx: number) => {
          const isCorrectOption = option === currentQuestion.answer;
          const isSelected = option === selectedAnswer;

          let btnClass = "bg-slate-100 text-slate-700 border-slate-300";
          if (showResult) {
            if (isCorrectOption) btnClass = "bg-green-500 text-white border-green-700 scale-105 z-10";
            else if (isSelected) btnClass = "bg-red-400 text-white border-red-600 opacity-70";
            else btnClass = "bg-slate-50 text-slate-300 border-slate-200 opacity-30";
          } else {
            const colors = ['bg-yellow-400 border-yellow-600', 'bg-green-400 border-green-600', 'bg-red-400 border-red-600', 'bg-sky-400 border-sky-600'];
            btnClass = `${colors[idx % colors.length]} text-white`;
          }

          return (
            <button
              key={idx}
              disabled={showResult}
              onClick={() => handleAnswer(option)}
              className={`
                h-20 text-3xl font-kids rounded-3xl transition-all border-b-8
                ${!showResult ? 'hover:-translate-y-1 active:scale-95' : ''}
                ${btnClass}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className={`h-24 flex items-center justify-center transition-all duration-300 ${showResult ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
        <button
          onClick={handleNext}
          className="w-24 h-24 bg-blue-500 hover:bg-blue-400 text-white rounded-full flex items-center justify-center text-5xl shadow-xl border-b-8 border-blue-700 active:scale-95 transition-all"
        >
          ➔
        </button>
      </div>
    </div>
  );
};

export default ClockGame;

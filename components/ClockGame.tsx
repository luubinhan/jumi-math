
import React, { useState, useEffect } from 'react';
import { Question, GameType } from '../types';
import { getEncouragement } from '../services/geminiService';

const ClockFace: React.FC<{ hours: number; minutes: number }> = ({ hours, minutes }) => {
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full border-[12px] border-blue-500 shadow-xl mx-auto flex items-center justify-center mb-8">
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
      <div className="absolute w-4 h-4 bg-slate-800 rounded-full z-30"></div>
      <div 
        className="absolute w-2.5 h-16 md:h-20 bg-slate-800 rounded-full origin-bottom z-10"
        style={{ transform: `rotate(${hourDeg}deg) translateY(-50%)` }}
      ></div>
      <div 
        className="absolute w-1.5 h-24 md:h-32 bg-red-500 rounded-full origin-bottom z-20"
        style={{ transform: `rotate(${minuteDeg}deg) translateY(-50%)` }}
      ></div>
    </div>
  );
};

const generateClockQuestions = (): Question[] => {
  const qs: Question[] = [];
  for (let i = 0; i < 10; i++) {
    let h = Math.floor(Math.random() * 12) + 1;
    let m = 0;

    if (i < 4) {
      m = 0;
    } else if (i < 7) {
      m = Math.random() > 0.5 ? 30 : 0;
    } else {
      const options = [0, 15, 30, 45];
      m = options[Math.floor(Math.random() * options.length)];
    }

    const timeString = `${h}:${m === 0 ? '00' : m}`;
    const optionsSet = new Set<string>([timeString]);
    while (optionsSet.size < 4) {
      const dh = Math.floor(Math.random() * 12) + 1;
      const dm = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      optionsSet.add(`${dh}:${dm === 0 ? '00' : dm}`);
    }

    qs.push({
      id: i,
      problem: `What time is it?`,
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
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setQuestions(generateClockQuestions());
  }, []);

  const handleAnswer = async (answer: string) => {
    if (showFeedback) return;
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const correct = answer === currentQ.answer;
    
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);

    setShowFeedback(true);
    const msg = await getEncouragement(correct, score + (correct ? 1 : 0));
    setFeedback(msg);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < 9) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onFinish(score + (correct ? 1 : 0));
      }
    }, 2000);
  };

  const currentQuestion = questions[currentIndex];

  if (questions.length === 0 || !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4">
        <div className="animate-spin text-5xl">⏰</div>
        <p className="font-kids text-xl text-slate-500">Setting Clocks...</p>
      </div>
    );
  }

  const [hStr, mStr] = (currentQuestion.answer as string).split(':');
  const h = parseInt(hStr);
  const m = parseInt(mStr);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-4 bg-slate-100 rounded-full mb-8 overflow-hidden border-2 border-slate-200">
        <div 
          className="h-full bg-blue-400 transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
        ></div>
      </div>

      <p className="text-slate-400 font-bold uppercase mb-4">Clock Quest: Level {currentIndex + 1}</p>
      
      <ClockFace hours={h} minutes={m} />

      <h2 className="text-3xl font-kids text-slate-800 mb-8">{currentQuestion.problem}</h2>

      <div className="grid grid-cols-2 gap-4 w-full">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            disabled={showFeedback}
            onClick={() => handleAnswer(option as string)}
            className={`
              h-20 text-3xl font-kids rounded-3xl transition-all active:scale-95 border-b-8
              ${showFeedback ? 'opacity-50' : 'hover:-translate-y-1'}
              ${idx === 0 ? 'bg-yellow-400 text-white border-yellow-600' : ''}
              ${idx === 1 ? 'bg-green-400 text-white border-green-600' : ''}
              ${idx === 2 ? 'bg-red-400 text-white border-red-600' : ''}
              ${idx === 3 ? 'bg-sky-400 text-white border-sky-600' : ''}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50 animate-in fade-in zoom-in duration-300">
          <div className={`
            p-10 rounded-full text-center max-w-xs shadow-2xl border-4
            ${isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}
          `}>
            <p className="text-2xl font-kids text-slate-800">
              {feedback || (isCorrect ? "Correct! 🕒" : "Try Again! 🌈")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockGame;

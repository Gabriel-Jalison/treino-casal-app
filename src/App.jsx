import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell,
  Flame,
  Trophy,
  CalendarDays,
  PlayCircle,
  CheckCircle2,
  Timer,
  Lock,
  User,
  Venus,
  Mars,
  Star,
  ArrowRight,
  RotateCcw,
  Home,
  Medal,
  Target,
} from "lucide-react";
import "./App.css";

const videos = {
  "Flexão tradicional": "RRi0-tvte6A",
  "Supino no chão com halteres": "m4Idhfsq5cU",
  "Desenvolvimento de ombro": "6SbZlzMXYoI",
  "Elevação lateral": "jannLx4RxKo",
  "Tríceps francês": "gB-QMYMlHLs",
  "Mergulho em banco/cadeira": "jH9RXQjbXqs",
  "Agachamento com barra": "_D0IYYxnVVA",
  "Afundo alternado": "jUWT5E6gAso",
  "Agachamento sumô": "ED9NUglcBrs",
  Stiff: "3ZwwrTtnGJo",
  "Elevação panturrilha": "6Zz_RG0EHFE",
  "Step subida alternada": "mDVUK_984cM",
  "Remada curvada": "Vk6c7CjtM14",
  "Remada unilateral": "Vk6c7CjtM14",
  "Rosca direta": "tl3NgUEg0aM",
  "Rosca martelo": "tl3NgUEg0aM",
  "Abdominal tradicional": "lgqafFHK4H8",
  "Roda abdominal": "yxKJrB8o-2Y",
  Prancha: "TbVWMhyax2U",
  "Elevação pélvica": "u3Jg9yOHOMM",
  "Coice com elástico": "Zf-w4Hg-cn0",
  "Flexão apoiando joelhos": "NZM9dui2MZo",
  "Abdominal bicicleta": "pMgnie8K21g",
  "Jump leve": "18TEdMhn6fw",
  Burpee: "UcU2i5G790s",
};

function getYoutubeEmbedUrl(videoId) {
  if (!videoId) {
    return "";
  }

  return `https://www.youtube.com/embed/${videoId}`;
}

const plans = {
  homem: [
    {
      day: "Segunda",
      title: "Peito, Ombros e Tríceps",
      focus: "Força + cardio",
      xp: 120,
      exercises: [
        {
          name: "Flexão tradicional",
          sets: "3x10–15",
          equipment: "Sem equipamento",
          rest: 45,
        },
        {
          name: "Supino no chão com halteres",
          sets: "4x12",
          equipment: "Halteres ajustáveis",
          rest: 60,
        },
        {
          name: "Desenvolvimento de ombro",
          sets: "3x12",
          equipment: "Halteres",
          rest: 60,
        },
        {
          name: "Elevação lateral",
          sets: "3x15",
          equipment: "Halteres",
          rest: 45,
        },
        {
          name: "Tríceps francês",
          sets: "3x12",
          equipment: "Halter",
          rest: 45,
        },
        {
          name: "Mergulho em banco/cadeira",
          sets: "3x15",
          equipment: "Banco ou cadeira firme",
          rest: 45,
        },
        {
          name: "Jump leve",
          sets: "8 min: 30s forte / 30s leve",
          equipment: "Mini trampolim",
          rest: 0,
        },
      ],
    },
    {
      day: "Terça",
      title: "Pernas e Glúteos",
      focus: "Músculo + resistência",
      xp: 130,
      exercises: [
        {
          name: "Agachamento com barra",
          sets: "4x12",
          equipment: "Barra curta + anilhas",
          rest: 75,
        },
        {
          name: "Afundo alternado",
          sets: "3x12 cada perna",
          equipment: "Halteres",
          rest: 60,
        },
        {
          name: "Agachamento sumô",
          sets: "3x15",
          equipment: "Halter",
          rest: 60,
        },
        { name: "Stiff", sets: "4x12", equipment: "Halteres", rest: 75 },
        {
          name: "Elevação panturrilha",
          sets: "4x20",
          equipment: "Halter opcional",
          rest: 45,
        },
        {
          name: "Step subida alternada",
          sets: "3x15 cada perna",
          equipment: "Step",
          rest: 60,
        },
        {
          name: "Jump leve",
          sets: "10 min moderado",
          equipment: "Mini trampolim",
          rest: 0,
        },
      ],
    },
    {
      day: "Quinta",
      title: "Costas, Bíceps e Abdômen",
      focus: "Postura + braço + core",
      xp: 125,
      exercises: [
        {
          name: "Remada curvada",
          sets: "4x12",
          equipment: "Barra ou halteres",
          rest: 60,
        },
        {
          name: "Remada unilateral",
          sets: "3x12 cada lado",
          equipment: "Halter",
          rest: 60,
        },
        {
          name: "Rosca direta",
          sets: "4x12",
          equipment: "Barra curta",
          rest: 60,
        },
        {
          name: "Rosca martelo",
          sets: "3x12",
          equipment: "Halteres",
          rest: 45,
        },
        {
          name: "Abdominal tradicional",
          sets: "3x20",
          equipment: "Tapete EVA",
          rest: 30,
        },
        {
          name: "Roda abdominal",
          sets: "3x8–10",
          equipment: "Roda abdominal",
          rest: 60,
        },
        {
          name: "Prancha",
          sets: "3x40 seg",
          equipment: "Tapete EVA",
          rest: 45,
        },
      ],
    },
    {
      day: "Sexta",
      title: "Corpo Inteiro",
      focus: "Alta queima",
      xp: 150,
      exercises: [
        {
          name: "Agachamento sumô",
          sets: "4 voltas x 15",
          equipment: "Halter",
          rest: 30,
        },
        {
          name: "Flexão tradicional",
          sets: "4 voltas x 10",
          equipment: "Sem equipamento",
          rest: 30,
        },
        {
          name: "Remada curvada",
          sets: "4 voltas x 12",
          equipment: "Halteres",
          rest: 30,
        },
        {
          name: "Step subida alternada",
          sets: "4 voltas x 20",
          equipment: "Step",
          rest: 30,
        },
        {
          name: "Burpee",
          sets: "4 voltas x 10",
          equipment: "Sem equipamento",
          rest: 45,
        },
        {
          name: "Roda abdominal",
          sets: "4 voltas x 8",
          equipment: "Roda abdominal",
          rest: 60,
        },
      ],
    },
  ],
  mulher: [
    {
      day: "Segunda",
      title: "Glúteos e Posterior",
      focus: "Definição + glúteos",
      xp: 120,
      exercises: [
        {
          name: "Agachamento sumô",
          sets: "4x15",
          equipment: "Halter",
          rest: 60,
        },
        { name: "Stiff", sets: "4x12", equipment: "Halteres", rest: 75 },
        {
          name: "Elevação pélvica",
          sets: "4x15",
          equipment: "Anilha ou halter",
          rest: 60,
        },
        {
          name: "Coice com elástico",
          sets: "3x15 cada perna",
          equipment: "Elástico",
          rest: 45,
        },
        {
          name: "Elevação panturrilha",
          sets: "4x20",
          equipment: "Sem equipamento ou halter",
          rest: 45,
        },
        {
          name: "Jump leve",
          sets: "10 min leve/moderado",
          equipment: "Mini trampolim",
          rest: 0,
        },
      ],
    },
    {
      day: "Terça",
      title: "Braços, Ombros e Abdômen",
      focus: "Braços definidos + core",
      xp: 110,
      exercises: [
        {
          name: "Desenvolvimento de ombro",
          sets: "3x12",
          equipment: "Halteres",
          rest: 45,
        },
        {
          name: "Elevação lateral",
          sets: "3x15",
          equipment: "Halteres",
          rest: 45,
        },
        {
          name: "Rosca direta",
          sets: "3x12",
          equipment: "Halteres ou barra",
          rest: 45,
        },
        {
          name: "Tríceps francês",
          sets: "3x12",
          equipment: "Halter",
          rest: 45,
        },
        {
          name: "Abdominal tradicional",
          sets: "3x20",
          equipment: "Tapete EVA",
          rest: 30,
        },
        {
          name: "Prancha",
          sets: "3x30–40 seg",
          equipment: "Tapete EVA",
          rest: 45,
        },
        {
          name: "Jump leve",
          sets: "8 min HIIT leve",
          equipment: "Mini trampolim",
          rest: 0,
        },
      ],
    },
    {
      day: "Quinta",
      title: "Quadríceps e Glúteos",
      focus: "Pernas + resistência",
      xp: 130,
      exercises: [
        {
          name: "Agachamento com barra",
          sets: "4x15",
          equipment: "Barra curta + anilhas",
          rest: 75,
        },
        {
          name: "Afundo alternado",
          sets: "3x12 cada perna",
          equipment: "Halteres",
          rest: 60,
        },
        {
          name: "Step subida alternada",
          sets: "3x15 cada perna",
          equipment: "Step",
          rest: 60,
        },
        {
          name: "Agachamento sumô",
          sets: "3x12 com pausa",
          equipment: "Halter",
          rest: 60,
        },
        {
          name: "Elevação pélvica",
          sets: "4x15",
          equipment: "Anilha ou halter",
          rest: 60,
        },
        {
          name: "Jump leve",
          sets: "10 min moderado",
          equipment: "Mini trampolim",
          rest: 0,
        },
      ],
    },
    {
      day: "Sexta",
      title: "Corpo Inteiro",
      focus: "Definição + queima",
      xp: 145,
      exercises: [
        {
          name: "Agachamento sumô",
          sets: "4 voltas x 15",
          equipment: "Halter",
          rest: 30,
        },
        {
          name: "Step subida alternada",
          sets: "4 voltas x 20",
          equipment: "Step",
          rest: 30,
        },
        {
          name: "Desenvolvimento de ombro",
          sets: "4 voltas x 12",
          equipment: "Halteres",
          rest: 30,
        },
        {
          name: "Flexão apoiando joelhos",
          sets: "4 voltas x 10",
          equipment: "Tapete EVA",
          rest: 30,
        },
        {
          name: "Abdominal bicicleta",
          sets: "4 voltas x 20",
          equipment: "Tapete EVA",
          rest: 30,
        },
        {
          name: "Jump leve",
          sets: "4 voltas x 1 min",
          equipment: "Mini trampolim",
          rest: 60,
        },
      ],
    },
  ],
};

function getTrainingDay() {
  const day = new Date().getDay();

  if (day === 1) return 0;
  if (day === 2) return 1;
  if (day === 4) return 2;
  if (day === 5) return 3;

  return 0;
}

const trainingWeekDays = [1, 2, 4, 5];

function getDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getWeekKey(date = new Date()) {
  const current = new Date(date);
  const day = current.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  current.setDate(current.getDate() + diffToMonday);

  return getDateKey(current);
}

function getPreviousTrainingDate() {
  const date = new Date();

  for (let i = 1; i <= 7; i++) {
    const previous = new Date();
    previous.setDate(date.getDate() - i);

    if (trainingWeekDays.includes(previous.getDay())) {
      return previous;
    }
  }

  return null;
}

function shouldResetProgress(progress) {
  if (!progress?.hasStartedBefore) {
    return false;
  }

  const hasAnyProgress = (progress.xp || 0) > 0 || (progress.streak || 0) > 0;

  if (!hasAnyProgress) {
    return false;
  }

  const previousTrainingDate = getPreviousTrainingDate();

  if (!previousTrainingDate) {
    return false;
  }

  const previousTrainingKey = getDateKey(previousTrainingDate);
  const completedPreviousTraining =
    progress.workoutDoneDates?.includes(previousTrainingKey);

  if (completedPreviousTraining) {
    return false;
  }

  // Evita zerar exatamente na virada do dia. O app só considera perda após 04:00
  // do dia seguinte ao treino perdido.
  const resetDeadline = new Date(previousTrainingDate);
  resetDeadline.setDate(resetDeadline.getDate() + 1);
  resetDeadline.setHours(4, 0, 0, 0);

  return new Date() >= resetDeadline;
}

function getInitialProgress() {
  const emptyProgress = {
    completed: {},
    workoutDoneDates: [],
    streak: 0,
    xp: 0,
    hasStartedBefore: false,
  };

  try {
    const savedProgress = localStorage.getItem("treino-casal-progress");

    if (!savedProgress) {
      return emptyProgress;
    }

    const progress = {
      ...emptyProgress,
      ...JSON.parse(savedProgress),
    };

    if (shouldResetProgress(progress)) {
      localStorage.setItem(
        "treino-casal-progress",
        JSON.stringify(emptyProgress),
      );
      return emptyProgress;
    }

    return progress;
  } catch (error) {
    console.error("Erro ao carregar progresso salvo:", error);
    return emptyProgress;
  }
}

function getTotalSeries(setsText) {
  const text = String(setsText || "").toLowerCase();
  const seriesMatch = text.match(/^(\d+)\s*x/);
  const roundsMatch = text.match(/^(\d+)\s*voltas?/);

  if (seriesMatch) {
    return Number(seriesMatch[1]);
  }

  if (roundsMatch) {
    return Number(roundsMatch[1]);
  }

  return 1;
}

function vibrateDevice(pattern = [80]) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function playTone({ frequency = 660, duration = 130, type = "sine" } = {}) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.2,
      audioContext.currentTime + 0.02,
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + duration / 1000,
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (error) {
    console.warn("Som não reproduzido pelo navegador:", error);
  }
}

function playSuccessSound() {
  playTone({ frequency: 720, duration: 120, type: "triangle" });
  setTimeout(
    () => playTone({ frequency: 920, duration: 150, type: "triangle" }),
    120,
  );
}

function playRestFinishedSound() {
  playTone({ frequency: 880, duration: 160, type: "square" });
  setTimeout(
    () => playTone({ frequency: 880, duration: 160, type: "square" }),
    220,
  );
}

const motivationMessages = [
  "Boa! Mais uma etapa vencida.",
  "Você está construindo constância.",
  "Foco total. O progresso vem na repetição.",
  "Excelente! Continue nesse ritmo.",
  "Disciplina de hoje, resultado de amanhã.",
];

function getMotivationMessage() {
  const index = Math.floor(Math.random() * motivationMessages.length);
  return motivationMessages[index];
}

function App() {
  const [screen, setScreen] = useState("login");
  const [name, setName] = useState("Gabriel");
  const [gender, setGender] = useState("homem");
  const [selectedDay, setSelectedDay] = useState(getTrainingDay());
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSeries, setCurrentSeries] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [initialProgress] = useState(() => getInitialProgress());

  const [completed, setCompleted] = useState(initialProgress.completed);
  const [workoutDoneDates, setWorkoutDoneDates] = useState(
    initialProgress.workoutDoneDates,
  );
  const [restSeconds, setRestSeconds] = useState(0);
  const [streak, setStreak] = useState(initialProgress.streak);
  const [xp, setXp] = useState(initialProgress.xp);
  const [hasStartedBefore, setHasStartedBefore] = useState(
    initialProgress.hasStartedBefore,
  );

  const plan = plans[gender];
  const workout = plan[selectedDay];
  const exercises = workout.exercises;
  const weekKey = getWeekKey();
  const key = `${gender}-${weekKey}-${selectedDay}`;
  const completedList = completed[key] || [];
  const progress = Math.round((completedList.length / exercises.length) * 100);
  const activeExercise = exercises[currentExercise];
  const totalSeries = getTotalSeries(activeExercise.sets);
  const exerciseProgress =
    ((currentExercise + (currentSeries - 1) / totalSeries) / exercises.length) *
    100;

  const level = Math.floor(xp / 250) + 1;
  const levelProgress = xp % 250;

  useEffect(() => {
    if (restSeconds <= 0) return;

    const timer = setInterval(() => {
      setRestSeconds((seconds) => {
        if (seconds <= 1) {
          clearInterval(timer);
          playRestFinishedSound();
          vibrateDevice([160, 80, 160]);
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [restSeconds]);

  useEffect(() => {
    localStorage.setItem(
      "treino-casal-progress",
      JSON.stringify({
        completed,
        workoutDoneDates,
        streak,
        xp,
        hasStartedBefore,
      }),
    );
  }, [completed, workoutDoneDates, streak, xp, hasStartedBefore]);

  function handleLogin() {
    setHasStartedBefore(true);
    setScreen("select");
  }

  function handleSelectGender(selectedGender) {
    setGender(selectedGender);
    setSelectedDay(getTrainingDay());
    setCurrentExercise(0);
    setCurrentSeries(1);
    setRestSeconds(0);
    setScreen("dashboard");
  }

  function showFeedback({
    title,
    message,
    xpGained,
    emoji = "💪",
    kind = "series",
  }) {
    setFeedback({
      title,
      message,
      xpGained,
      emoji,
      kind,
    });
  }

  function closeFeedback() {
    const action = pendingAction;

    setFeedback(null);
    setPendingAction(null);

    if (action?.type === "nextExercise") {
      setCurrentExercise((value) => value + 1);
      setCurrentSeries(1);
      return;
    }

    if (action?.type === "completeWorkout") {
      setCurrentSeries(1);
      setScreen("complete");
    }
  }

  function finishExercise() {
    const list = completed[key] || [];
    const isLastSeries = currentSeries >= totalSeries;
    const isLastExercise = currentExercise >= exercises.length - 1;

    playSuccessSound();
    vibrateDevice([80, 40, 80]);

    if (!isLastSeries) {
      setCurrentSeries((value) => value + 1);
      setXp((value) => value + 5);

      if (activeExercise.rest > 0) {
        setRestSeconds(activeExercise.rest);
      }

      showFeedback({
        title: `Série ${currentSeries} concluída!`,
        message: getMotivationMessage(),
        xpGained: 5,
        emoji: "🔥",
        kind: "series",
      });

      return;
    }

    if (!list.includes(currentExercise)) {
      setCompleted({
        ...completed,
        [key]: [...list, currentExercise],
      });
      setXp((value) => value + 20);
    }

    if (activeExercise.rest > 0 && !isLastExercise) {
      setRestSeconds(activeExercise.rest);
    }

    if (!isLastExercise) {
      setPendingAction({ type: "nextExercise" });
      showFeedback({
        title: "Exercício concluído!",
        message: "Você desbloqueou o próximo desafio.",
        xpGained: 20,
        emoji: "🏋️",
        kind: "exercise",
      });
      return;
    }

    const todayKey = getDateKey();

    if (!workoutDoneDates.includes(todayKey)) {
      setWorkoutDoneDates([...workoutDoneDates, todayKey]);
      setStreak((value) => value + 1);
      setXp((value) => value + workout.xp);
    }

    setPendingAction({ type: "completeWorkout" });
    showFeedback({
      title: "Treino finalizado!",
      message: `Missão cumprida. Você ganhou +${workout.xp} XP extra.`,
      xpGained: workout.xp,
      emoji: "🏆",
      kind: "workout",
    });
  }

  function resetWorkout() {
    setCompleted({
      ...completed,
      [key]: [],
    });
    setCurrentExercise(0);
    setCurrentSeries(1);
    setRestSeconds(0);
    setFeedback(null);
    setPendingAction(null);
  }

  return (
    <div className="app">
      <div className="phone">
        <div className="glow glow-green"></div>
        <div className="glow glow-purple"></div>

        <AnimatePresence mode="wait">
          {screen === "login" && (
            <motion.div
              key="login"
              className="screen center-screen"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="logo-box">
                <Dumbbell size={34} />
              </div>

              <h1>Treino em Casa</h1>
              <p className="subtitle">
                Cronograma, vídeos, descanso e metas para manter constância.
              </p>

              <div className="card">
                <label>Usuário</label>
                <div className="input-box">
                  <User size={20} />
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <label>Senha</label>
                <div className="input-box">
                  <Lock size={20} />
                  <input type="password" defaultValue="123456" />
                </div>

                <button className="primary-btn" onClick={handleLogin}>
                  Entrar no treino <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {screen === "select" && (
            <motion.div
              key="select"
              className="screen center-screen"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2>Escolha seu plano</h2>
              <p className="subtitle">
                O app ajusta os treinos, foco e metas conforme o perfil.
              </p>

              <div className="gender-grid">
                <button onClick={() => handleSelectGender("homem")}>
                  <Mars size={44} />
                  <strong>Homem</strong>
                  <span>Força, massa e definição</span>
                </button>

                <button onClick={() => handleSelectGender("mulher")}>
                  <Venus size={44} />
                  <strong>Mulher</strong>
                  <span>Glúteos, pernas e definição</span>
                </button>
              </div>
            </motion.div>
          )}

          {screen === "dashboard" && (
            <motion.div
              key="dashboard"
              className="screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="topbar">
                <div>
                  <p>Bem-vindo,</p>
                  <h2>{gender === "mulher" ? "Iasmim" : name || "Aluno"}</h2>
                </div>

                <button
                  className="small-btn"
                  onClick={() => setScreen("select")}
                >
                  Trocar plano
                </button>
              </div>

              <div className="stats-grid">
                <Stat
                  icon={<Flame size={20} />}
                  label="Sequência"
                  value={`${streak} dias`}
                />
                <Stat icon={<Trophy size={20} />} label="Nível" value={level} />
                <Stat icon={<Star size={20} />} label="XP" value={xp} />
              </div>

              <div className="level-card">
                <div>
                  <span>Meta do nível</span>
                  <strong>{levelProgress}/250 XP</strong>
                </div>
                <Medal size={40} />
                <div className="progress-bg">
                  <div
                    className="progress-fill dark"
                    style={{ width: `${(levelProgress / 250) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="section-title">
                <CalendarDays size={20} />
                <h3>Cronograma semanal</h3>
              </div>

              <div className="days-grid">
                {plan.map((item, index) => (
                  <button
                    key={item.day}
                    className={selectedDay === index ? "active" : ""}
                    onClick={() => {
                      setSelectedDay(index);
                      setCurrentExercise(0);
                      setCurrentSeries(1);
                      setRestSeconds(0);
                    }}
                  >
                    <strong>{item.day.slice(0, 3)}</strong>
                    <span>{item.xp} XP</span>
                  </button>
                ))}
              </div>

              <div className="card workout-card">
                <div className="workout-header">
                  <div>
                    <span>{workout.day}</span>
                    <h2>{workout.title}</h2>
                    <p>{workout.focus}</p>
                  </div>
                  <Target size={38} />
                </div>

                <div className="progress-bg">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="progress-text">
                  {completedList.length} de {exercises.length} exercícios
                  concluídos
                </p>

                <button
                  className="primary-btn light"
                  onClick={() => {
                    setCurrentExercise(0);
                    setCurrentSeries(1);
                    setRestSeconds(0);
                    setScreen("workout");
                  }}
                >
                  Começar treino <PlayCircle size={20} />
                </button>
              </div>

              <div className="exercise-list">
                {exercises.map((exercise, index) => (
                  <ExerciseRow
                    key={index}
                    exercise={exercise}
                    done={completedList.includes(index)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {screen === "workout" && (
            <motion.div
              key="workout"
              className="screen"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="topbar">
                <button
                  className="small-btn"
                  onClick={() => setScreen("dashboard")}
                >
                  Voltar
                </button>

                <button className="small-btn" onClick={resetWorkout}>
                  <RotateCcw size={16} /> Reset
                </button>
              </div>

              {restSeconds > 0 && (
                <div className="rest-card">
                  <div>
                    <span>Descanso ativo</span>
                    <strong>{restSeconds}s</strong>
                  </div>
                  <Timer size={42} />
                </div>
              )}

              <p className="subtitle">
                Exercício {currentExercise + 1} de {exercises.length}
              </p>
              <h1>{activeExercise.name}</h1>

              <div className="series-pill">
                Série {currentSeries} de {totalSeries}
              </div>

              <div className="card">
                <div className="video-box">
                  {videos[activeExercise.name] ? (
                    <iframe
                      src={getYoutubeEmbedUrl(videos[activeExercise.name])}
                      title={`Vídeo: ${activeExercise.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="video-placeholder">
                      <PlayCircle size={58} />
                      <strong>Vídeo indisponível</strong>
                      <span>Adicione um vídeo para este exercício depois.</span>
                    </div>
                  )}
                </div>

                <Info label="Séries/Repetições" value={activeExercise.sets} />
                <Info label="Equipamento" value={activeExercise.equipment} />
                <Info
                  label="Descanso após finalizar"
                  value={
                    activeExercise.rest > 0
                      ? `${activeExercise.rest} segundos`
                      : "Sem pausa"
                  }
                />
              </div>

              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{ width: `${exerciseProgress}%` }}
                ></div>
              </div>

              <button className="primary-btn big" onClick={finishExercise}>
                {currentSeries < totalSeries
                  ? `Finalizar série ${currentSeries}`
                  : "Finalizar exercício"}
                <CheckCircle2 size={24} />
              </button>
            </motion.div>
          )}

          {screen === "complete" && (
            <motion.div
              key="complete"
              className="screen center-screen complete-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="trophy-box">
                <Trophy size={52} />
              </div>

              <h1>Treino concluído!</h1>
              <p className="subtitle">
                Você ganhou XP e aumentou sua sequência de dias.
              </p>

              <div className="stats-grid">
                <Stat
                  icon={<Flame size={20} />}
                  label="Sequência"
                  value={`${streak} dias`}
                />
                <Stat icon={<Star size={20} />} label="XP Total" value={xp} />
              </div>

              <button
                className="primary-btn light"
                onClick={() => setScreen("dashboard")}
              >
                Voltar ao painel <Home size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {feedback && (
          <FeedbackOverlay
            feedback={feedback}
            progress={Math.min(100, Math.round(exerciseProgress))}
            onContinue={closeFeedback}
          />
        )}
      </div>
    </div>
  );
}

function FeedbackOverlay({ feedback, progress, onContinue }) {
  return (
    <motion.div
      className="feedback-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`feedback-card feedback-${feedback.kind}`}
        initial={{ scale: 0.88, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
      >
        <motion.div
          className="feedback-emoji"
          initial={{ rotate: -8, scale: 0.7 }}
          animate={{ rotate: [0, -8, 8, 0], scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {feedback.emoji}
        </motion.div>

        <h2>{feedback.title}</h2>
        <p>{feedback.message}</p>

        <div className="feedback-xp">+{feedback.xpGained} XP</div>

        <div className="feedback-progress">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          ></motion.div>
        </div>

        <button className="primary-btn light" onClick={onContinue}>
          Continuar <ArrowRight size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="stat-card">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ExerciseRow({ exercise, done }) {
  return (
    <div className="exercise-row">
      <div className={done ? "check done" : "check"}>
        {done ? <CheckCircle2 size={20} /> : <Dumbbell size={20} />}
      </div>

      <div>
        <strong>{exercise.name}</strong>
        <span>
          {exercise.sets} • {exercise.equipment}
        </span>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="info-box">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;

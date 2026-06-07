import { useEffect, useRef, useState } from "react";
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
  Volume2,
  Zap,
  Settings,
  Save,
  Trash2,
} from "lucide-react";
import "./App.css";

const STORAGE_KEY = "treino-casal-progress";
const PREFERENCES_KEY = "treino-casal-preferences";
const trainingWeekDays = [1, 2, 4, 5];

const videos = {
  "Flexão tradicional": "RRi0-tvte6A",
  "Supino no chão com halteres": "lpRTahKkhl4",
  "Desenvolvimento de ombro": "ztl24bolQHg",
  "Elevação lateral": "rkVV5U7Q4r8",
  "Tríceps francês": "9EkGm94Q2Ms",
  "Mergulho em banco/cadeira": "jH9RXQjbXqs",
  "Agachamento com barra": "13rt06PvZKY",
  "Afundo alternado": "pN8SiiepN5U",
  "Agachamento sumô": "ED9NUglcBrs",
  Stiff: "cETLf4xXYCQ",
  "Elevação panturrilha": "6Zz_RG0EHFE",
  "Step subida alternada": "rw_XFgY1_gI",
  "Remada curvada": "8hmYxGeYb8I",
  "Remada unilateral": "8hmYxGeYb8I",
  "Rosca direta": "tl3NgUEg0aM",
  "Rosca martelo": "tl3NgUEg0aM",
  "Abdominal tradicional": "Vh-HZqPR0ew",
  "Roda abdominal": "lgqafFHK4H8",
  Prancha: "Yu0wjtD5FkU",
  "Elevação pélvica": "pY9qYxyCO_c",
  "Coice com elástico": "2Akyaerg_2A",
  "Flexão apoiando joelhos": "NZM9dui2MZo",
  "Abdominal bicicleta": "pMgnie8K21g",
  "Jump leve": "-M2GAQuUl7I",
  Burpee: "UcU2i5G790s",
};

function getYoutubeEmbedUrl(videoId) {
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
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

const motivationalMessages = [
  "Boa! Cada série conta.",
  "Você está construindo constância.",
  "Excelente! Continua no ritmo.",
  "Mais um passo para evoluir.",
  "Foco total. Você está indo bem.",
  "Treino feito é progresso real.",
];

function getTrainingDay() {
  const day = new Date().getDay();
  if (day === 1) return 0;
  if (day === 2) return 1;
  if (day === 4) return 2;
  if (day === 5) return 3;
  return 0;
}

function getNextWorkoutInfo(plan) {
  const today = new Date().getDay();
  const schedule = [
    { weekDay: 1, index: 0 },
    { weekDay: 2, index: 1 },
    { weekDay: 4, index: 2 },
    { weekDay: 5, index: 3 },
  ];

  const next = schedule.find((item) => item.weekDay > today) || schedule[0];
  const rawDaysUntil = (next.weekDay - today + 7) % 7;
  const daysUntil = rawDaysUntil === 0 ? 7 : rawDaysUntil;

  return {
    daysUntil,
    workout: plan[next.index],
    index: next.index,
  };
}

function getTrainingIndexByWeekDay(weekDay) {
  if (weekDay === 1) return 0;
  if (weekDay === 2) return 1;
  if (weekDay === 4) return 2;
  if (weekDay === 5) return 3;
  return null;
}

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

function getWorkoutKeyFromDate(date = new Date()) {
  const trainingIndex = getTrainingIndexByWeekDay(date.getDay());
  if (trainingIndex === null) return null;
  return `${getWeekKey(date)}-${trainingIndex}`;
}

function getPreviousTrainingDate() {
  const date = new Date();
  for (let i = 1; i <= 7; i++) {
    const previous = new Date();
    previous.setDate(date.getDate() - i);
    if (trainingWeekDays.includes(previous.getDay())) return previous;
  }
  return null;
}

function getEmptyProgress() {
  return {
    completed: {},
    workoutDoneDates: [],
    streak: 0,
    xp: 0,
    hasStartedBefore: false,
    lastWorkoutDoneAt: null,
    lastResetAt: null,
  };
}

function shouldResetProgress(progress) {
  if (!progress?.hasStartedBefore) return false;

  const hasAnyProgress = (progress.xp || 0) > 0 || (progress.streak || 0) > 0;
  if (!hasAnyProgress) return false;

  const today = new Date();
  const todayKey = getDateKey(today);

  // Não zera no fim de semana. Sábado e domingo são descanso/teste livre.
  if (!trainingWeekDays.includes(today.getDay())) return false;

  // Se acabou de concluir um treino nas últimas 24h, não zera ao fechar/abrir o app.
  if (progress.lastWorkoutDoneAt) {
    const lastDone = new Date(progress.lastWorkoutDoneAt);
    const hoursSinceLastDone =
      (today.getTime() - lastDone.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastDone < 24) return false;
  }

  const previousTrainingDate = getPreviousTrainingDate();
  if (!previousTrainingDate) return false;

  const previousWorkoutKey = getWorkoutKeyFromDate(previousTrainingDate);
  if (!previousWorkoutKey) return false;

  const completedPreviousTraining =
    progress.workoutDoneDates?.includes(previousWorkoutKey);
  if (completedPreviousTraining) return false;

  // Evita zerar repetidamente no mesmo dia.
  if (progress.lastResetAt === todayKey) return false;

  // Só zera depois das 04:00 do dia atual, para evitar problemas na virada de data.
  const resetDeadline = new Date(today);
  resetDeadline.setHours(4, 0, 0, 0);

  return today >= resetDeadline;
}

function getInitialProgress() {
  const emptyProgress = getEmptyProgress();

  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (!savedProgress) return emptyProgress;

    const progress = {
      ...emptyProgress,
      ...JSON.parse(savedProgress),
    };

    if (shouldResetProgress(progress)) {
      const resetProgress = {
        ...emptyProgress,
        hasStartedBefore: true,
        lastResetAt: getDateKey(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetProgress));
      return resetProgress;
    }

    return progress;
  } catch (error) {
    console.error("Erro ao carregar progresso salvo:", error);
    return emptyProgress;
  }
}

function getInitialPreferences() {
  const defaultPreferences = {
    maleName: "Gabriel",
    femaleName: "Iasmim",
    defaultGender: "homem",
    soundEnabled: true,
    vibrationEnabled: true,
  };

  try {
    const savedPreferences = localStorage.getItem(PREFERENCES_KEY);

    if (!savedPreferences) {
      return defaultPreferences;
    }

    return {
      ...defaultPreferences,
      ...JSON.parse(savedPreferences),
    };
  } catch (error) {
    console.error("Erro ao carregar preferências:", error);
    return defaultPreferences;
  }
}

function getSeriesCount(setsText) {
  const normalized = String(setsText || "").toLowerCase();
  const directMatch = normalized.match(/^(\d+)\s*x/);
  const roundsMatch = normalized.match(/^(\d+)\s*voltas?/);

  if (directMatch) return Number(directMatch[1]);
  if (roundsMatch) return Number(roundsMatch[1]);

  return 1;
}

function playSound(type = "success") {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = type === "rest" ? 880 : 660;
    gain.gain.value = 0.08;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.18);
  } catch (error) {
    console.warn("Som não disponível neste navegador.", error);
  }
}

function vibrate(pattern = [80]) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch (error) {
    console.warn("Vibração não disponível neste navegador.", error);
  }
}

function getRandomMessage() {
  const index = Math.floor(Math.random() * motivationalMessages.length);
  return motivationalMessages[index];
}

function App() {
  const [screen, setScreen] = useState("login");
  const [initialPreferences] = useState(() => getInitialPreferences());
  const [maleName, setMaleName] = useState(initialPreferences.maleName);
  const [femaleName, setFemaleName] = useState(initialPreferences.femaleName);
  const [gender, setGender] = useState(initialPreferences.defaultGender);
  const [soundEnabled, setSoundEnabled] = useState(
    initialPreferences.soundEnabled,
  );
  const [vibrationEnabled, setVibrationEnabled] = useState(
    initialPreferences.vibrationEnabled,
  );
  const [selectedDay, setSelectedDay] = useState(getTrainingDay());
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSeries, setCurrentSeries] = useState(1);
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
  const [lastWorkoutDoneAt, setLastWorkoutDoneAt] = useState(
    initialProgress.lastWorkoutDoneAt,
  );
  const [lastResetAt, setLastResetAt] = useState(initialProgress.lastResetAt);
  const [reward, setReward] = useState(null);

  const wasResting = useRef(false);

  const plan = plans[gender];
  const workout = plan[selectedDay];
  const exercises = workout.exercises;
  const weekKey = getWeekKey();
  const key = `${gender}-${weekKey}-${selectedDay}`;
  const selectedWorkoutKey = `${weekKey}-${selectedDay}`;
  const completedList = completed[key] || [];
  const progress = Math.round((completedList.length / exercises.length) * 100);
  const activeExercise = exercises[currentExercise];
  const totalSeries = getSeriesCount(activeExercise.sets);
  const isLastSeries = currentSeries >= totalSeries;
  const isLastExercise = currentExercise >= exercises.length - 1;

  const level = Math.floor(xp / 250) + 1;
  const levelProgress = xp % 250;
  const displayName =
    gender === "mulher" ? femaleName || "Iasmim" : maleName || "Gabriel";
  const todayTrainingIndex = getTrainingIndexByWeekDay(new Date().getDay());
  const isTodayTrainingDay = todayTrainingIndex !== null;
  const todayWorkout = isTodayTrainingDay ? plan[todayTrainingIndex] : null;
  const todayWorkoutKey = isTodayTrainingDay
    ? `${weekKey}-${todayTrainingIndex}`
    : null;
  const todayCompletedKey = isTodayTrainingDay
    ? `${gender}-${weekKey}-${todayTrainingIndex}`
    : null;
  const todayCompletedList = todayCompletedKey
    ? completed[todayCompletedKey] || []
    : [];
  const todayProgress = todayWorkout
    ? Math.round(
        (todayCompletedList.length / todayWorkout.exercises.length) * 100,
      )
    : 0;
  const todayIsCompleted = todayWorkoutKey
    ? workoutDoneDates.includes(todayWorkoutKey)
    : false;
  const nextWorkoutInfo = getNextWorkoutInfo(plan);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        completed,
        workoutDoneDates,
        streak,
        xp,
        hasStartedBefore,
        lastWorkoutDoneAt,
        lastResetAt,
      }),
    );
  }, [
    completed,
    workoutDoneDates,
    streak,
    xp,
    hasStartedBefore,
    lastWorkoutDoneAt,
    lastResetAt,
  ]);

  useEffect(() => {
    localStorage.setItem(
      PREFERENCES_KEY,
      JSON.stringify({
        maleName,
        femaleName,
        defaultGender: gender,
        soundEnabled,
        vibrationEnabled,
      }),
    );
  }, [maleName, femaleName, gender, soundEnabled, vibrationEnabled]);

  useEffect(() => {
    if (restSeconds > 0) {
      wasResting.current = true;
      const timer = setInterval(() => {
        setRestSeconds((seconds) => Math.max(0, seconds - 1));
      }, 1000);

      return () => clearInterval(timer);
    }

    if (restSeconds === 0 && wasResting.current) {
      wasResting.current = false;
      if (soundEnabled) playSound("rest");
      if (vibrationEnabled) vibrate([120, 60, 120]);
    }
  }, [restSeconds, soundEnabled, vibrationEnabled]);

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

  function createReward({
    title,
    description,
    xpValue,
    afterAction,
    restTime = 0,
  }) {
    setReward({
      title,
      description,
      xpValue,
      afterAction,
      restTime,
      message: getRandomMessage(),
    });
  }

  function finishSeriesOrExercise() {
    if (soundEnabled) playSound("success");
    if (vibrationEnabled) vibrate([80]);

    if (!isLastSeries) {
      setXp((value) => value + 5);
      createReward({
        title: `Série ${currentSeries} concluída!`,
        description: `Faltam ${totalSeries - currentSeries} série(s) neste exercício.`,
        xpValue: 5,
        afterAction: "next-series",
        restTime: activeExercise.rest,
      });
      return;
    }

    const list = completed[key] || [];
    const alreadyCompletedExercise = list.includes(currentExercise);

    if (!alreadyCompletedExercise) {
      setCompleted({
        ...completed,
        [key]: [...list, currentExercise],
      });
      setXp((value) => value + 20);
    }

    if (!isLastExercise) {
      createReward({
        title: "Exercício concluído!",
        description: "Você avançou para o próximo movimento.",
        xpValue: alreadyCompletedExercise ? 0 : 20,
        afterAction: "next-exercise",
        restTime: activeExercise.rest,
      });
      return;
    }

    let workoutBonus = 0;

    if (!workoutDoneDates.includes(selectedWorkoutKey)) {
      workoutBonus = workout.xp;
      setWorkoutDoneDates([...workoutDoneDates, selectedWorkoutKey]);
      setStreak((value) => value + 1);
      setXp((value) => value + workout.xp);
      setLastWorkoutDoneAt(new Date().toISOString());
    }

    createReward({
      title: "Treino concluído!",
      description: "Você completou o treino do dia. Excelente constância!",
      xpValue: (alreadyCompletedExercise ? 0 : 20) + workoutBonus,
      afterAction: "complete-workout",
      restTime: 0,
    });
  }

  function continueAfterReward() {
    if (!reward) return;

    const { afterAction, restTime } = reward;
    setReward(null);

    if (afterAction === "next-series") {
      setCurrentSeries((value) => value + 1);
      if (restTime > 0) setRestSeconds(restTime);
      return;
    }

    if (afterAction === "next-exercise") {
      setCurrentExercise((value) => value + 1);
      setCurrentSeries(1);
      if (restTime > 0) setRestSeconds(restTime);
      return;
    }

    if (afterAction === "complete-workout") {
      setCurrentSeries(1);
      setRestSeconds(0);
      setScreen("complete");
    }
  }

  function resetWorkout() {
    setCompleted({
      ...completed,
      [key]: [],
    });
    setCurrentExercise(0);
    setCurrentSeries(1);
    setRestSeconds(0);
  }

  function resetAllProgress() {
    const confirmed = window.confirm(
      "Tem certeza que deseja zerar todo o progresso? Isso remove XP, sequência e treinos concluídos.",
    );

    if (!confirmed) return;

    setCompleted({});
    setWorkoutDoneDates([]);
    setRestSeconds(0);
    setStreak(0);
    setXp(0);
    setHasStartedBefore(true);
    setLastWorkoutDoneAt(null);
    setLastResetAt(getDateKey());
    setReward(null);
    setCurrentExercise(0);
    setCurrentSeries(1);
    setScreen("dashboard");
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

              <div className="hero-badges">
                <span>
                  <Flame size={14} /> Sequência
                </span>
                <span>
                  <Star size={14} /> XP
                </span>
                <span>
                  <PlayCircle size={14} /> Vídeos
                </span>
              </div>

              <div className="card">
                <label>Usuário</label>
                <div className="input-box">
                  <User size={20} />
                  <input
                    value={maleName}
                    onChange={(event) => setMaleName(event.target.value)}
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
                  <h2>{displayName}</h2>
                </div>

                <div className="topbar-actions">
                  <button
                    className="small-btn"
                    onClick={() => setScreen("settings")}
                  >
                    <Settings size={16} /> Perfil
                  </button>
                  <button
                    className="small-btn"
                    onClick={() => setScreen("select")}
                  >
                    Trocar plano
                  </button>
                </div>
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

              <div
                className={
                  isTodayTrainingDay ? "today-card" : "today-card rest-day"
                }
              >
                <div className="today-card-header">
                  <div className="today-icon">
                    {isTodayTrainingDay ? (
                      <Target size={24} />
                    ) : (
                      <Dumbbell size={24} />
                    )}
                  </div>

                  <div>
                    <span>
                      {isTodayTrainingDay
                        ? "Treino de hoje"
                        : "Hoje é dia de descanso"}
                    </span>
                    <h2>
                      {isTodayTrainingDay
                        ? todayWorkout.title
                        : "Recuperação ativa"}
                    </h2>
                    <p>
                      {isTodayTrainingDay
                        ? todayIsCompleted
                          ? "Treino concluído. Excelente constância!"
                          : `${todayWorkout.focus} • ${todayProgress}% concluído`
                        : `Próximo treino: ${nextWorkoutInfo.workout.day} — ${nextWorkoutInfo.workout.title}`}
                    </p>
                  </div>
                </div>

                {isTodayTrainingDay ? (
                  <>
                    <div className="progress-bg">
                      <div
                        className="progress-fill"
                        style={{ width: `${todayProgress}%` }}
                      ></div>
                    </div>

                    <button
                      className="primary-btn today-btn"
                      onClick={() => {
                        setSelectedDay(todayTrainingIndex);
                        setCurrentExercise(0);
                        setCurrentSeries(1);
                        setRestSeconds(0);
                        setScreen("workout");
                      }}
                    >
                      {todayIsCompleted
                        ? "Refazer treino"
                        : "Começar treino de hoje"}{" "}
                      <PlayCircle size={20} />
                    </button>
                  </>
                ) : (
                  <div className="rest-suggestions">
                    <span>Alongamento leve</span>
                    <span>Caminhada 20 min</span>
                    <span>Hidratação</span>
                  </div>
                )}
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

          {screen === "settings" && (
            <motion.div
              key="settings"
              className="screen"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="topbar">
                <div>
                  <p>Configurações</p>
                  <h2>Perfil do app</h2>
                </div>

                <button
                  className="small-btn"
                  onClick={() => setScreen("dashboard")}
                >
                  Voltar
                </button>
              </div>

              <div className="card settings-card">
                <div className="settings-title">
                  <User size={22} />
                  <div>
                    <strong>Nomes dos perfis</strong>
                    <span>Personalize como cada treino aparece no painel.</span>
                  </div>
                </div>

                <label>Nome do perfil masculino</label>
                <div className="input-box">
                  <Mars size={20} />
                  <input
                    value={maleName}
                    onChange={(event) => setMaleName(event.target.value)}
                  />
                </div>

                <label>Nome do perfil feminino</label>
                <div className="input-box">
                  <Venus size={20} />
                  <input
                    value={femaleName}
                    onChange={(event) => setFemaleName(event.target.value)}
                  />
                </div>
              </div>

              <div className="card settings-card">
                <div className="settings-title">
                  <Settings size={22} />
                  <div>
                    <strong>Experiência do treino</strong>
                    <span>Controle som, vibração e perfil padrão.</span>
                  </div>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Som de progresso</strong>
                    <span>Toques ao finalizar série e descanso.</span>
                  </div>
                  <button
                    className={soundEnabled ? "toggle active" : "toggle"}
                    onClick={() => setSoundEnabled((value) => !value)}
                  >
                    {soundEnabled ? "Ligado" : "Desligado"}
                  </button>
                </div>

                <div className="settings-row">
                  <div>
                    <strong>Vibração</strong>
                    <span>Funciona quando o celular/navegador permitir.</span>
                  </div>
                  <button
                    className={vibrationEnabled ? "toggle active" : "toggle"}
                    onClick={() => setVibrationEnabled((value) => !value)}
                  >
                    {vibrationEnabled ? "Ligada" : "Desligada"}
                  </button>
                </div>

                <div className="profile-switch">
                  <button
                    className={gender === "homem" ? "active" : ""}
                    onClick={() => handleSelectGender("homem")}
                  >
                    <Mars size={18} /> {maleName || "Gabriel"}
                  </button>
                  <button
                    className={gender === "mulher" ? "active" : ""}
                    onClick={() => handleSelectGender("mulher")}
                  >
                    <Venus size={18} /> {femaleName || "Iasmim"}
                  </button>
                </div>
              </div>

              <div className="card settings-card danger-card">
                <div className="settings-title">
                  <Trash2 size={22} />
                  <div>
                    <strong>Zerar progresso</strong>
                    <span>Use apenas para recomeçar do zero.</span>
                  </div>
                </div>

                <button className="danger-btn" onClick={resetAllProgress}>
                  <Trash2 size={18} /> Zerar XP, sequência e treinos
                </button>
              </div>

              <div className="card settings-card app-info-card">
                <div className="settings-title">
                  <Save size={22} />
                  <div>
                    <strong>Salvamento atual</strong>
                    <span>
                      Versão 1 salva dados no navegador deste aparelho.
                    </span>
                  </div>
                </div>
                <p>
                  Se trocar de celular, navegador ou limpar dados do
                  Safari/Chrome, o progresso pode não aparecer. Na versão futura
                  com login real, isso ficará salvo em banco de dados.
                </p>
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
                Exercício {currentExercise + 1} de {exercises.length} • Série{" "}
                {currentSeries} de {totalSeries}
              </p>
              <h1>{activeExercise.name}</h1>

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
                <Info
                  label="Série atual"
                  value={`${currentSeries} de ${totalSeries}`}
                />
                <Info label="Equipamento" value={activeExercise.equipment} />
                <Info
                  label="Descanso após finalizar série"
                  value={
                    activeExercise.rest > 0
                      ? `${activeExercise.rest} segundos`
                      : "Sem pausa"
                  }
                />
              </div>

              <div className="progress-bg workout-progress">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(((currentExercise + (currentSeries - 1) / totalSeries) / exercises.length) * 100).toFixed(1)}%`,
                  }}
                ></div>
              </div>

              <button
                className="primary-btn big"
                onClick={finishSeriesOrExercise}
              >
                {isLastSeries ? "Finalizar exercício" : "Finalizar série"}{" "}
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

        <AnimatePresence>
          {reward && (
            <motion.div
              className="reward-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="reward-card"
                initial={{ scale: 0.85, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <motion.div
                  className="reward-icon"
                  animate={{
                    rotate: [0, -8, 8, -4, 4, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{ duration: 0.7 }}
                >
                  <Zap size={54} />
                </motion.div>

                <h2>{reward.title}</h2>
                <p>{reward.description}</p>
                <strong className="reward-xp">+{reward.xpValue} XP</strong>

                <div className="reward-progress">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                  ></motion.div>
                </div>

                <span className="reward-message">{reward.message}</span>

                <button className="primary-btn" onClick={continueAfterReward}>
                  Continuar <Volume2 size={20} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
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

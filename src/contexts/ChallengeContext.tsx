import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

//#focopraticagrupo - Aula 3
//#neverstoplearning - Aula 4

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number; 
    ChallengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as ChallengesContextData );

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps){
    
    const [ level, setLevel ] = useState(rest.level ?? 1);
    const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0);
    const [ ChallengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0);
    const [ activeChallenge, setActiveChallenge ] = useState(null);
    const experienceToNextLevel = Math.pow((level +1) * 4, 2);
    const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('ChallengesCompleted', String(ChallengesCompleted));
    }, [ level, currentExperience, ChallengesCompleted ]);

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length );
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio ', {
                body: `Valendo ${challenge.amount} xp`
            });
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(ChallengesCompleted + 1);
    }

    return(
        <ChallengeContext.Provider value={{
            level, currentExperience, ChallengesCompleted, activeChallenge, experienceToNextLevel, levelUp,
            startNewChallenge, resetChallenge, completeChallenge, closeLevelUpModal
        }}>
            { children }
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    );
}
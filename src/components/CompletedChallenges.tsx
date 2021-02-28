import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import style from '../styles/components/CompletedChallenges.module.css';

export default function CompletedChallenges(){
    const { ChallengesCompleted } = useContext(ChallengeContext);

    return(
        <div className={style.completedChallengesContainer}>
           <span>Desafios completos</span> 
            <span>{ ChallengesCompleted }</span>
        </div>
    );
}
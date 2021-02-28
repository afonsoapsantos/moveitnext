import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import style from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceed(){
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={style.challengeBoxContainer} >
            { activeChallenge ? (
                <div className={style.challengeActive} >
                    <header>Ganhe { activeChallenge.amount } xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt={activeChallenge.type} />
                        <strong>Novo desafio</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>

                    <footer>
                        <button onClick={ handleChallengeFailed } type="button" className={style.challengeFailedbutton}>
                            Falhei
                        </button>
                        <button onClick={ handleChallengeSucceed } type="button" className={style.challengeSucceededButton}>
                            Completo
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={style.challengeNotActive} >
                    <strong>Finalize um ciclo para receber um desafio.</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios.
                    </p>
                </div>
            ) }
        </div>
    );

}
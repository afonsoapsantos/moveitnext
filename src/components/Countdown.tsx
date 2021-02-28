import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import style from '../styles/components/Countdown.module.css'

//#jornadainfinita

export default function Countdown(){
    const { hasFinished, isActive, minutes, seconds, startCountdown, resetCountdown } = useContext( CountdownContext );

    const [ minutesLeft,minutesRight ] = String(minutes).padStart(2, '0').split('');
    const [ secondsLeft,secondsRight ] = String(seconds).padStart(2, '0').split('');

    return(
        <div>
            <div className={style.countdownContainer}>
                <div>
                    <span>{ minutesLeft }</span>
                    <span>{ minutesRight }</span>
                </div>
                <span>:</span>
                <div>
                    <span>{ secondsLeft }</span>
                    <span>{ secondsRight }</span>
                </div>
            </div>
            
            { hasFinished ? (
                <button disabled
                    type="button" 
                    className={ style.countdownButton}>Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive? (
                        <button onClick={ resetCountdown } 
                            type="button" 
                            className={ `${style.countdownButton} ${style.countdownButtonActive}` } >Abandonar ciclo
                        </button>
                    ) : (
                        <button onClick={ startCountdown } 
                            type="button" 
                            className={ style.countdownButton } >Iniciar um ciclo
                        </button>
                    ) }
                </>
            ) }

        </div>
    );
}
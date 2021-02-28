import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import style from '../styles/components/Profile.module.css';

export default function Profile() {
    const { level } = useContext(ChallengeContext);

    return(
        <div className={ style.profileContainer }>
            <img src="https://github.com/afonsoapsantos.png" alt="Afonso Santos"/>
            <div>
                <strong>Afonso Santos</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                     Level { level }
                </p>
            </div>
        </div>
    );
}
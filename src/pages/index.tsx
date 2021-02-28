import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import Profile from "../components/Profile";
import style from '../styles/pages/Home.module.css';
import Head from 'next/head';
import ChallengeBox from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

import { GetServerSideProps } from 'next';
import React from "react";
import { ChallengesProvider } from "../contexts/ChallengeContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}>
      <div className={ style.container }>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        
        <ExperienceBar  />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
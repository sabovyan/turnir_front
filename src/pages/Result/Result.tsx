import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/features';

import Typography from '@material-ui/core/Typography';
import Colors from 'src/styles/colors';
import svg from '../../assets/tournaments.svg';
import resultIcons from './resultIcons';

import styles from './Result.module.css';

const Result = () => {
  const { participants, name } = useSelector(
    (state: RootState) => state.result,
  );

  const [width] = useState(
    Array(participants.length)
      .fill(480)
      .map((el, idx) => (el - idx * 20 <= 150 ? 150 - idx : el - idx * 20)),
  );

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={svg} alt="" />
        <Typography
          variant="h3"
          style={{ color: Colors.orange, textTransform: 'uppercase' }}
        >
          {name}
        </Typography>
      </div>

      <ol className={styles.resultList}>
        {participants.map((participant, idx) => (
          <li
            className={styles.resultListItem}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              width: width[idx],
              fontSize: idx === 0 ? `1.5rem` : '1.2rem',
              fontWeight: idx < 3 ? 500 : 100,
              marginBottom: '0.5rem',
              padding: '1rem',
              background: `hsl(${25 + idx * 2}deg, 100%, 40%)`,
              color: 'white',
              borderRadius: 5,
            }}
          >
            {resultIcons[idx] ? (
              resultIcons[idx]
            ) : (
              <p
                style={{
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                  flexGrow: 0,
                  width: '1rem',
                  height: '1rem',
                }}
              >
                {idx + 1}
              </p>
            )}
            <p style={{ flexGrow: 4, margin: '0 2rem 0' }}>
              {participant.name}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Result;

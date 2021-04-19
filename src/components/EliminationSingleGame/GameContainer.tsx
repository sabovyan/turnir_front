import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './EliminationGameRectangle.module.css';
import { CButton } from '../common/Buttons';
import Colors from 'src/styles/colors';

interface Props {
  player1: string | undefined;
  player2: string | undefined;
  isGameStarted: boolean;
  score1: number;
  score2: number;
  handleResultPageOpen: () => void;
}

const GameContainer = ({
  player1,
  player2,
  isGameStarted,
  score1,
  score2,
  handleResultPageOpen,
}: Props) => {
  return (
    <div className={styles.eliminationGameContainer}>
      {player1 && player2 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <Typography
              className={styles.gameText}
              style={{
                fontWeight: 500,
                color: score2 > score1 ? Colors.secondaryWhite : Colors.white,
                textDecoration: score2 > score1 ? 'line-through white' : 'none',
              }}
            >
              {player1}
            </Typography>
            <Typography
              className={styles.gameText}
              style={{
                fontWeight: 500,
                color: score1 > score2 ? Colors.secondaryWhite : Colors.white,
                textDecoration: score1 > score2 ? 'line-through white' : 'none',
              }}
            >
              {player2}
            </Typography>
          </div>
          {isGameStarted ? (
            <>
              {score1 > -1 && score2 > -1 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Typography
                    align="center"
                    className={styles.gameText}
                    style={{
                      alignSelf: 'flex-end',
                      fontWeight: 500,
                      color:
                        score2 > score1 ? Colors.secondaryWhite : Colors.white,
                    }}
                  >
                    {score1 !== -1 ? score1 : null}
                  </Typography>
                  <Typography
                    align="center"
                    className={styles.gameText}
                    style={{
                      alignSelf: 'flex-end',
                      fontWeight: 500,
                      color:
                        score1 > score2 ? Colors.secondaryWhite : Colors.white,
                    }}
                  >
                    {score2 !== -1 ? score2 : null}
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography
                    className={styles.gameText}
                    style={{
                      alignSelf: 'flex-end',
                      fontWeight: 500,
                    }}
                  >
                    vs
                  </Typography>
                </div>
              )}
            </>
          ) : null}
        </div>
      ) : (
        <Typography className={styles.gameWithOnePlayer}>
          {player1 ? player1 : player2 ? player2 : ''}
        </Typography>
      )}

      <div
        className={styles.enterResult}
        style={{
          display: isGameStarted && player1 && player2 ? 'flex' : 'none',
        }}
      >
        <CButton
          text="Enter Result"
          cssStyles={{ padding: '5px 10px' }}
          className={styles.enterResultButton}
          onClick={handleResultPageOpen}
        />
      </div>
    </div>
  );
};

export default GameContainer;

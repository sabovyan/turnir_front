// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';

import SetupTopBar from 'src/components/TopBar/SetuptopBar/SetupTopBar';
import SetupList from './SetupList';

// import SetupTopBar from '../../components/TopBar/SetuptopBar/SetupTopBar';
// import { RootState } from '../../store/features';
// import Typography from '@material-ui/core/Typography';
// import SetupList from './SetupList';
// import EliminationGameRectangle from '../../components/EliminationGameRectangle/EliminationGameRectangle';
// import Round from 'src/components/Round/Round';

// interface Props {}

// const Setup = (props: Props) => {
//   const { players, rounds } = useSelector(
//     (state: RootState) => state.gamesForSetup,
//   );

//   const history = useHistory();

//   useEffect(() => {
//     if (players.length < 1) {
//       history.push('/');
//     }
//   }, [history, players.length]);

//   return (
//     <>
//       <SetupTopBar />
//       <div
//         style={{
//           display: 'flex',
//         }}
//       >
//         <SetupList players={players} />
//         <div
//           style={{
//             width: 'calc(100vw - 340px)',
//             height: 'calc(100vh - 100px)',
//             display: 'flex',
//             overflow: 'auto',
//           }}
//         >
//           {rounds &&
//             rounds.map((round, roundIndex) => (
//               <Round
//                 key={round.name}
//                 roundHeight={rounds[0].games.length * 100}
//                 name={round.name}
//               >
//                 {round.games.map(({ id, participant1, participant2 }, idx) =>
//                   roundIndex === rounds.length - 1 &&
//                   round.games.length === 2 ? (
//                     <div
//                       style={{
//                         position: 'absolute',
//                         left: 0,
//                         bottom: idx === 0 ? '50%' : '20%',
//                         transform:
//                           idx === 0
//                             ? `translate(0,${50}%)`
//                             : `translate(0, ${90}%)`,
//                       }}
//                     >
//                       <EliminationGameRectangle
//                         key={id}
//                         player1={participant1 ? participant1.name : ''}
//                         player2={!participant2 ? ' ' : participant2.name}
//                         isGameStarted={false}
//                         isEven={idx % 2 === 0 ? false : true}
//                         isFirstRound={roundIndex === 0 ? true : false}
//                         isFinal={
//                           roundIndex === rounds.length - 1 ? false : true
//                         }
//                         maxHeight={
//                           idx === 0 ? rounds[0].games.length * 100 : 100
//                         }
//                         numberOfGamesInOneRound={round.games.length}
//                         label={idx === 1 ? 'Third place' : undefined}
//                       />
//                     </div>
//                   ) : (
//                     <EliminationGameRectangle
//                       key={id}
//                       player1={participant1 ? participant1.name : ''}
//                       player2={!participant2 ? ' ' : participant2.name}
//                       isGameStarted={false}
//                       isEven={idx % 2 === 0 ? false : true}
//                       isFirstRound={roundIndex === 0 ? true : false}
//                       isFinal={roundIndex === rounds.length - 1 ? false : true}
//                       maxHeight={rounds[0].games.length * 100}
//                       numberOfGamesInOneRound={round.games.length}
//                     />
//                   ),
//                 )}
//               </Round>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Setup;
export default function Setup() {
  return (
    <>
      <SetupList />
      <SetupTopBar />
    </>
  );
}

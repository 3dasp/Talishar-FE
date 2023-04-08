import { useAppDispatch, useAppSelector } from 'app/Hooks';
import { submitButton } from 'features/game/GameSlice';
import styles from './EndGameMenuOptions.module.css';
import { useState } from 'react';
import { PROCESS_INPUT } from 'appConstants';
import { RootState } from 'app/Store';
import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { getGameInfo } from 'features/game/GameSlice';

const EndGameMenuOptions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { roguelikeGameID } = useAppSelector(getGameInfo, shallowEqual);
  //Always player 1 in roguelike, which is only place this matters
  const health = useAppSelector(
    (state: RootState) => state.game.playerOne.Health ?? '0'
  );

  const handleMainMenu = async () => {
    dispatch(submitButton({ button: { mode: PROCESS_INPUT.MAIN_MENU } }));
    navigate('/');
  };

  const handleQuickRematch = () => {
    dispatch(submitButton({ button: { mode: PROCESS_INPUT.QUICK_REMATCH } }));
  };

  const handleFullRematch = () => {
    dispatch(submitButton({ button: { mode: PROCESS_INPUT.FULL_REMATCH } }));
    // TODO: Redirect to sideboard screen if opponent has also elected for a full rematch.
  };

  const handleContinueAdventure = () => {
    dispatch(
      submitButton({
        button: { mode: PROCESS_INPUT.ROGUELIKE_RESUME_ADVENTURE }
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div className={styles.buttonDiv} onClick={handleMainMenu}>
          Main Menu
        </div>
        {roguelikeGameID && health > 0 && (
          <div className={styles.buttonDiv} onClick={handleContinueAdventure}>
            Continue Adventure
          </div>
        )}
        {!roguelikeGameID && (
          <>
            <div className={styles.buttonDiv} onClick={handleQuickRematch}>
              Quick Rematch (no sideboarding)
            </div>
            <div className={styles.buttonDiv} onClick={handleFullRematch}>
              Full Rematch (new sideboard)
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EndGameMenuOptions;

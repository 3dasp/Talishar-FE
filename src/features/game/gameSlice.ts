import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ParseGameState } from '../../app/parseGameState';
import { Player } from './player';

export interface GameState {
  gameID: number;
  playerID: number;
  authKey: string;
  playerOne: Player;
  playerTwo: Player;
}

export interface GetNextTurnParams {
  gameID: number;
  playerID: number;
  authKey: string;
}

const initialState: GameState = {
  gameID: 663,
  playerID: 3,
  authKey: '28df413b665604299807c461a7f3cae71c4176cb2b96afad04b84cf96d016258',
  playerOne: {
    // human player
    HeadEq: { cardNumber: 'WTR079' },
    ChestEq: { cardNumber: 'WTR150' },
    GlovesEq: { cardNumber: 'UPR158' },
    FeetEq: { cardNumber: 'WTR154' },
    WeaponLEq: { cardNumber: 'CRU048' },
    Hero: { cardNumber: 'CRU046' },
    WeaponREq: { cardNumber: 'CRU049' },
    Health: 20,
    ActionPoints: 0,
    PitchRemaining: 0
  },
  playerTwo: {
    // AI or opposing player
    HeadEq: { cardNumber: 'CRU006' },
    ChestEq: { cardNumber: 'WTR005' },
    GlovesEq: { cardNumber: 'WTR153' },
    FeetEq: { cardNumber: 'WTR004' },
    WeaponLEq: { cardNumber: '' },
    Hero: { cardNumber: 'WTR002' },
    WeaponREq: { cardNumber: 'WTR003' },
    Health: 20,
    ActionPoints: 0,
    PitchRemaining: 0
  }
};

export const nextTurn = createAsyncThunk(
  'game/nextTurn',
  async (params: GetNextTurnParams) => {
    const queryURL =
      'http://localhost/FaBOnline/GetNextTurn3.php?gameName=' +
      params.gameID +
      '&playerID=' +
      params.playerID +
      '&authKey=' +
      params.authKey;
    const response = await fetch(queryURL, {
      method: 'GET',
      headers: {}
    });
    const data = await response.text();
    console.log(data);
    const gameState: GameState = ParseGameState(data);
    console.log(gameState);
    return gameState;
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(nextTurn.fulfilled, (state, action) => {
      state.playerOne = action.payload.playerOne;
      state.playerTwo = action.payload.playerTwo;
    });
  }
});

// export const {} = gameSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default gameSlice.reducer;

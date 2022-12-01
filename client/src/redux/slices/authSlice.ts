import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../../api/auth/auth.service";
import { RootState } from "../rootReducer";
import { AppThunk } from "../store";

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  userId?: string;
  session?: null | string;
  error?: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setAuthSuccess: (state, { payload }: PayloadAction<AuthState>) => {
      state.userId = payload.userId;
      state.session = payload.session;
      state.isLoggedIn = true;
      state.error = undefined;
    },
    setAuthFail: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setSignOut: (state) => {
      (state.isLoggedIn = false),
        (state.userId = undefined),
        (state.session = undefined);
    },
  },
});

export const signin =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    let user;
    try {
      dispatch(setLoading(true));
      user = await login({ email, password });
      if (user.success) {
        dispatch(setAuthSuccess(user));
      } else {
        dispatch(setAuthFail(user.message));
      }
    } catch (error: any) {
      dispatch(setAuthFail(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const signout = (): AppThunk => (dispatch) => {
  console.log("hey");
  try {
    dispatch(setLoading(true));
    dispatch(setSignOut());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const { setAuthSuccess, setLoading, setSignOut, setAuthFail } =
  authSlice.actions;

export const selectIsLoggedIn = (state: RootState) =>
  state.authReducer.isLoggedIn;
export const selectAuth = (state: RootState) => state.authReducer;

export default authSlice.reducer;

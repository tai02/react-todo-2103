import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = false

const isComposingSlice = createSlice({
  name: 'isComposing',
  initialState,
  reducers: {
    setIsComposing(_, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setIsComposing } = isComposingSlice.actions

export default isComposingSlice.reducer

export const generateAsyncReducerCases = (builder, action, property) => {
  builder
    .addCase(action.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    })
    .addCase(action.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state[property] = action.payload.data
        ? action.payload.data
        : action.payload;
    })
    .addCase(action.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error.message;
    });
};

'use client'
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);

      // Dispatch the thunk and return the promise produced by it
      const thunkPromise = dispatch(thunk(arg));

      thunkPromise
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));

      return thunkPromise; // Return the promise produced by dispatch
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}

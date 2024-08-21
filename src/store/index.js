import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { expenseSlice } from './expense/expense-slice'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { loggerMiddleware } from './middlewares/logger-middleware'

const rootReducer = combineReducers({
  EXPENSE: expenseSlice.reducer,
})

const presistConfig = {
  key: 'root',
  storage,
  whitelist: ['EXPENSE']
}

const presistedReducers = persistReducer(presistConfig, rootReducer)

const store = configureStore({
  reducer: presistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(loggerMiddleware.middleware),
})

const persistor = persistStore(store)

export { store, persistor }

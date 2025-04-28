import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/auth.service'
import { caseApi } from './services/case.service'
// ...

export const store = configureStore({
    reducer: {
        // ...

        [authApi.reducerPath]: authApi.reducer,
        [caseApi.reducerPath]: caseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, caseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
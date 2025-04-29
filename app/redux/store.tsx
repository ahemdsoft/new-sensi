import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/auth.service'
import { caseApi } from './services/case.service'
import { orderApi } from './services/order.service'
// ...

export const store = configureStore({
    reducer: {
        // ...

        [authApi.reducerPath]: authApi.reducer,
        [caseApi.reducerPath]: caseApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, caseApi.middleware, orderApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
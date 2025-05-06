import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth.service";
import { caseApi } from "./services/case.service";
import { orderApi } from "./services/order.service";
import { deviceApi } from "./services/device.service";
import { cuponApi } from "./services/cupon.service";
// ...

export const store = configureStore({
  reducer: {
    // ...

    [authApi.reducerPath]: authApi.reducer,
    [caseApi.reducerPath]: caseApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [deviceApi.reducerPath]: deviceApi.reducer,
    [cuponApi.reducerPath]: cuponApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      caseApi.middleware,
      orderApi.middleware,
      deviceApi.middleware,
      cuponApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

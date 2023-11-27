# React Typescript with Redux and Redux Toolkit

This is a project that I created while following the YouTube tutorial by [Cosden Solutions](https://www.youtube.com/watch?v=5yEG6GhoJBs).

## Contents
This project contains a basic implementation of Redux and the usage of Redux Toolkit which uses a number counter as an example.
The tutorial explains how to setup a store, actions, and reducers and how to use Redux Toolkit to conveniently setup synchronous and asynchronous reducers.

## Conclusions
I was able to understand that Redux is a state management library with the concept of values being immutable.  
The use of actions and reducers is to create a copy of the current state of an object, mutate the copied data, then replace the state as whole compared to directly mutating the value.  
I understand the creation of a store which is usually created like the code block below.
```typescript
/// store.ts
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counter/counterSlice"

// This is the redux store configuration which takes in an object, reducer, which holds all the reducers we'll need based on the project.
export const store = configureStore({
  reducer: {
    counterReducer;
  }
})

// This will allow us to retrieve the data type of the reducer.
export type RootState = ReturnType<typeof store.getState>;
// This will alove us to use async actions.
export type AppDispatch = typeof store.dispatch

```

In the case of this tutorial, the creation of actions and reducers will be in a separate script named "counterSlice.ts" which will contain the structure of the state we want to manage as well as the initial values of that state.  
We will be using the ***createSlice()*** method from the "***@reduxjs/toolkit***" library which will handle the naming of the reducers, handling of updating the state as a whole, as well as connecting our reducers to the state.
This is the code block that shows how *createSlice()* is used.
```typescript
/// counterSlice.ts
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// The data structure of our state.
interface CounterState {
    value: number;
}

// This is the initial value of our state
const initialState: CounterState = {
    value: 0,
}

// This is the state variable that will be created using the createSlice() method from "@reduxjs/toolkit"
const counterSlice = createSlice({
    // Name of the state slice.
    name: "counter",
    // Initial value of the state slice.
    initialState,
    // The associated reducers for this state slice.
    reducers: {
        // This is an example of a reducer with no parameters
        increment: (state) => {
            state.value += 1;
        },

        decrement: (state) => {
            state.value -= 1;
        },
        // This is an example of a reducer with parameters using the PayloadAction from "@reduxjs/toolkit"
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },
    // The associated async reducers for this state slice.
    extraReducers: (builder) => {
        // This builder is used to handle the pending and fulfilled states of the async reducer.
        builder.addCase(incrementAsync.pending, () => {
            console.log("incrementAsync.pending")
        })
        .addCase(
            incrementAsync.fulfilled,
            (state, action: PayloadAction<number>) => {
                state.value += action.payload
            }
        )
    }
});

// This is the implementation of an async reducer using the "createAsyncThunk()" method from the "@reduxjs/toolkit" library.
export const incrementAsync = createAsyncThunk(
    // This is the name of the async reducer.
    "counter/incrementAsync",
    // This is the implementation of the async reducer
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return amount;
    }
)

// Export the reducers of the state slice as a deconstructed object.
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Export the reducers of the state slice.
export default counterSlice.reducer;
```

For the usage of the store, reducer, and actions, it will be used in a simple component called ***Counter.tsx*** which will display the current value of the state slice, in this case, a number, and will have two buttons for incrementing and decrementing the value.
The component will be using hooks from the ***react-redux*** library such as ***useSelector*** and ***useDispatch***.
The *useSelector* hook allows us to retrieve the value of the state slice.
The *useDispatch* allows us to call and execute the actions of our reducer, which, in this case are the *increment*, *decrement*, *incrementByAmount*, and *incrementAsync*.
This is how those hooks are used in the tutorial.
```typescript
/// Component.tsx
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { decrement, increment, incrementByAmount, incrementAsync } from "../state/counter/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counterReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(incrementAsync(10))}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
```

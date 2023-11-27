import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
} from "../state/counter/counterSlice";

import style from "./Counter.module.css";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counterReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={style.container}>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(incrementAsync(10))}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;

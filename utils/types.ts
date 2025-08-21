export type StateType = "idle" | "loading" | "success" | "error";
export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

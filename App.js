import MainRouter from "./routes/MainRouter";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StatusBar } from "react-native";
export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </>
  );
}

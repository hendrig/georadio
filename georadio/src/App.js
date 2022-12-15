import Main from "./components/main";
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";

function App() {
  return (
    <AuthenticationContextProvider>
      <Main />
    </AuthenticationContextProvider>
  );
}
export default App;

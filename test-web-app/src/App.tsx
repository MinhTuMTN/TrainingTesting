import Router from "./routes/Router";
import "./App.css";
import AuthProvider from "./hooks/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;

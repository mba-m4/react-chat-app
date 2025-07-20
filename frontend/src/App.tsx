import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";

import Chat from "./components/Chat/Chat";
import Login from "@/pages/Login";

function App() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <Chat />
                </SignedIn>
                <SignedOut>
                  <Login />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

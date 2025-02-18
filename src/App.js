import { useState } from "react";
import { Layout } from './components/layout'

// import { Button } from "@/components/ui/button";
import Login from "./components/Login";
import MainBoard from "./components/MainBoard";

const App = () => {
  const [user, setUser] = useState(null);

  return (

    <Layout>
        {!user ? <Login setUser={setUser} /> : <MainBoard user={user} setUser={setUser} />}      
        {/* <MainBoard user={user} setUser={setUser} /> */}
    </Layout>

  )
}

export default App

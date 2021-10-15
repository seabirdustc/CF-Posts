import { Router } from "@reach/router";
import Posts from './components/Posts'

function App() {
  return (
    <Router>
      <Posts path="/" />
    </Router>
  );
}

export default App;

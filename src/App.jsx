import {ScrollTrigger, SplitText} from 'gsap/all';
import Navbar from './components/Navbar';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar/>
    </main>
  )
}

export default App
import {ScrollTrigger, SplitText} from 'gsap/all';
import Navbar from './components/Navbar';
import gsap from 'gsap';
import Hero from './components/Hero';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <div className='h-dvh bg-black'/>
    </main>
  )
}

export default App
'use client';

import { useState, useRef } from 'react';
import {sliderLists} from '../../constants/index.js';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {
    const contentRef = useRef();
    const cocktailRef = useRef();

    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(() => {
        // Animate the title
        gsap.fromTo('#title', 
            {opacity: 0}, 
            {opacity: 1, duration: 1}
        );
        
        // Animate the cocktail image
        gsap.fromTo('.cocktail img', 
            {opacity: 0, xPercent: -100}, 
            {opacity: 1, xPercent: 0, duration: 1, ease: 'power1.inOut'}
        );
        
        // Animate the details
        gsap.fromTo('.details', 
            {opacity: 0, yPercent: 100}, 
            {opacity: 1, yPercent: 0, duration: 1, ease: 'power1.inOut'}
        );
    }, { dependencies: [currentIndex] });

    const totalCocktails = sliderLists.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails; 

        setCurrentIndex(newIndex);
    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
    }

    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(+1);

  return (
    <section id="menu" aria-labelledby="menu-heding">
        <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
        <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />
    
        <h2 id="menu-heading" className="sr-only">
            Cocktails Menu
        </h2>

        <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
            {sliderLists.map((cocktail, index) => {
                const isActive = index === currentIndex;   

                return (
                    <button key={cocktail.id} className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
                        onClick={() => goToSlide(index)}>
                        {cocktail.name}
                    </button>
                )
        })}
        </nav>

        <div className='content'>
            <div className='arrows'>
                <button className='text-left' onClick={() => goToSlide(currentIndex - 1)}>
                    <span>{prevCocktail.name}</span>
                    <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true"/>
                </button>

                <button className='text-left' onClick={() => goToSlide(currentIndex + 1)}>
                    <span>{nextCocktail.name}</span>
                    <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true"/>
                </button>
            </div>

            <div className='cocktail'>
                <img ref={cocktailRef} src={currentCocktail.image} className='object-contain' />
            </div>
            <div className='recipe'>
                <div ref={contentRef} className='info'>
                    <p>Recipe for:</p>
                    <p id='title'>{currentCocktail.name}</p>
                </div>
                <div className='details'>
                    <h2>{currentCocktail.title}</h2>
                    <p>{currentCocktail.description}</p>

                </div>
            </div>
        </div>
    </section>
  )
}

export default Menu
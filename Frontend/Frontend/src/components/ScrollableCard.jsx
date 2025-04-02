import React, { useRef } from "react";
import '../../CSS/Home.css'
const ScrollableCards = ({ data, title }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 100; // Adjust scrolling distance
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="scroll-section">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="scroll-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>❮</button>
        <button className="scroll-btn right" onClick={() => scroll("right")}>❯</button>
        <div className="scroll-container" ref={scrollRef}>
          <div className="card-container">
            {data.map((item, index) => (
              <div className="card" key={index}>
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>❯</button>
      </div>
    </div>
  );
};

export default ScrollableCards;

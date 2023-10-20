import { useState, useEffect } from "react";
import Paragraph from "./Paragraph";
import Loading from "./Loading";
import "./Paragraphs.scss";
const url = "https://raw.githubusercontent.com/programmer-rahad/json-files/main/paragaraphs.json";

function Paragraphs() {
  const [loading, setLoading] = useState(true);
  const [count,setCount] = useState(3);
  const [paragaraphs, setParagaraphs] = useState([]);

  const fetchParagaraphs = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const paragaraphs = await response.json();
       console.log(paragaraphs.length);
       
      setLoading(false);
      setParagaraphs(paragaraphs);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchParagaraphs();
  }, []);
  if (loading) {
    return <Loading />;
  } 
  
  return (
    <section className="section-center">
      <h4>Your Instant Paragraph Generator</h4>
      <form className="lorem-form" onSubmit={(e) => {
        e.preventDefault();
        setCount(count)
      }}>
        <label htmlFor="amount">paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          min="1" 
          max={paragaraphs.length}
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button className="btn">generate</button>
      </form>
      <article className="lorem-text">
        {paragaraphs.filter((_,i) => count > i).map((para,i) => <Paragraph key={i} text={para} /> )}
      </article>
    </section>
  );
}

export default Paragraphs;

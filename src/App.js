
import './App.css';
import React, { useEffect,useState } from 'react';
import NetflixCard from './components/NetflixCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const App=()=> {

  const [myData, setMyData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://netflix54.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=50&limit_suggestions=20&lang=en';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '5003ca2b69msh7ecd26612ba0f47p1ffb05jsn8e351579bf04',
          'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        console.log(result);
        setMyData(result.titles)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000},
        items: 5
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 3
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
};
  return (
    <Carousel responsive={responsive}  showDots={true}>

    {
        myData.map((curElem) => {
            return <NetflixCard key={curElem.summary.id} actualData={curElem}/>
        })
    }

</Carousel>
  );
}

export default App;

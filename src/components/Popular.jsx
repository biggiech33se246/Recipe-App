import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
      getPopular();
    },[]);

    const getPopular = async () => {

      const check = localStorage.getItem("popular");

      if (check) {
        setPopular(JSON.parse(check));
      }

      else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        const data = await api.json();

        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setPopular(data.recipes);
        console.log(data.recipes);
      }
    };

    return (
      <div>
          <Wrapper>
            <h3>Popular Recipes</h3>

            <Splide options={{perPage: 3}}>

            {popular.map((recipe) => {
              return(
                <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipes/"+recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt="recipe.title" />
                    <Gradient />
                  </Link>
                </Card>
                </SplideSlide>
              );
            })}
            </Splide>
          </Wrapper>
    </div>
    );
  }

  const Wrapper = styled.div`
    margin 4rem 0rem;
  `;

  const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
      border-radius: 2rem;
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    p{
      position: absolute;
      z-index: 10;
      left: 50%;
      bottom: 0%;
      transform: translate(-50%, 0%);
      color: white;
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 1rem;
      height: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
  `;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
  width: 100%;
  height: 100%;
`;
  
  export default Popular;
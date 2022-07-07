import React from "react";
import styled from "styled-components";
import { useGlobalContaxt } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { githubRepos } = useGlobalContaxt();
  // console.log(githubRepos);
  const languages = githubRepos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    // console.log(stargazers_count);
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        // label: language,
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  const mostPopLang = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  // MOst Starts Rating
  const mostStartLang = Object.values(languages)
    .map((item) => {
      return {
        ...item,
        value: item.stars,
      };
    })
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);
  // Column Charts
  let { stars, folks } = githubRepos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.folks[forks] = { label: name, value: forks };
      return total;
    },
    { stars: {}, folks: {} }
  );
  stars = Object.values(stars).slice(-5).reverse();
  folks = Object.values(folks).slice(-5).reverse();
  // console.log(folks);
  // const dataDonut = [
  //   {
  //     label: "Food",
  //     value: "285",
  //   },
  //   {
  //     label: "Apparels",
  //     value: "146",
  //   },
  //   {
  //     label: "Electronics",
  //     value: "105",
  //   },
  // ];
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostPopLang} />
        <Column3D data={stars} />
        <Doughnut2D data={mostStartLang} />
        <Bar3D data={folks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;

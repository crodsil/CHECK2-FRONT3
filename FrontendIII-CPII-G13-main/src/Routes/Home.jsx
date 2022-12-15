import { useEffect, useState } from "react";
import Card from "../Components/Card";
import { ctdUrl } from "../urls";

const Home = () => {
  const [dentistaData, setDentistaData] = useState([]);

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    fetch(`${ctdUrl}${"dentista"}`).then((response) =>
      response.json().then((data) => {
        setDentistaData(data);
        console.log(data);
      })
    );
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {/* Tudo que está abaixo deve ir para o Card */}
        {dentistaData.map((dentistaCard) => {
          return <Card key={dentistaCard.matricula} dentista={dentistaCard} />;
        })}
      </div>
    </>
  );
};

export default Home;

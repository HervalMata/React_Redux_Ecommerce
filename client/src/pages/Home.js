import React from 'react';
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

const Home = () => {

    return (
        <>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron text={["Ultimos Produtos", "Novidades", "Mais Vendidos"]} />
            </div>

            <h4 className="text-danger p-3 mt-5 mb-5 display-4 jumbotron">
                Novidades
            </h4>
            <NewArrivals />

            <h4 className="text-danger p-3 mt-5 mb-5 display-4 jumbotron">
                Mais Vendidos
            </h4>
            <BestSellers />

            <br/>
            <br/>
        </>
    );
};

export default Home;
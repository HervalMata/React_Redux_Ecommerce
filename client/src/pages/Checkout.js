import React from 'react';

const Checkout = () => {
    const saveAddressToDb = () => {

    };

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Endereço de Entrega</h4>
                <br />
                <br />
                textarea
                <button
                    className="btn btn-primary mt-2"
                    onClick={saveAddressToDb}>
                    Salvar
                </button>
                <hr />
                <h4>Tem Cupom?</h4>
                <br />
                Aplicar Cupom
            </div>

            <div className="col-md-6">
                <h4>Sumário da compra</h4>
                <hr />
                <p>Produtos</p>
                <hr />
                <p>Lista de Produtos</p>
                <hr />
                <p>Total do carrinho: $x</p>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary">Finaliza Compra</button>
                    </div>

                    <div className="col-md-6">
                        <button className="btn btn-primary">Esvaziar carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
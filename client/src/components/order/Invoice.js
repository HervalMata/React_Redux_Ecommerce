import React from 'react';
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {DataTableCell, Table, TableBody, TableCell, TableHeader} from "@david.kucsai/react-pdf-table";

const Invoice = ({ order }) => (
    <Document>
        <Page style={styles.body}>
            <Text style={styles.header} fixed>
                ~ {new Date().toLocaleString()} ~
            </Text>
            <Text style={styles.title}>Order Invoice</Text>
            <Text style={styles.author}>Herval Mata</Text>
            <Text style={styles.subtitle}>Order Summary</Text>

            <Table>
                <TableHeader>
                    <TableCell>Titulo</TableCell>
                    <TableCell>Preço</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Cor</TableCell>
                </TableHeader>
            </Table>

            <Table data={order.products}>
                <TableBody>
                    <DataTableCell getContent={(x) => x.product.title} />
                    <DataTableCell getContent={(x) => `R$ ${x.product.price},00`} />
                    <DataTableCell getContent={(x) => x.product.count} />
                    <DataTableCell getContent={(x) => x.product.color} />
                </TableBody>
            </Table>

            <Text style={styles.text}>
                <Text>
                    Data: {"          "}
                        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
                </Text>
                {"\n"}
                <Text>
                    Ordem Nº: {"        "}
                    {order.paymentIntent.id}
                </Text>
                {"\n"}
                <Text>
                    Ordem Status: {"    "}
                    {order.orderStatus}
                </Text>
                {"\n"}
                <Text>
                    Total Pago: {"        "}
                    {order.paymentIntent.amount}
                </Text>
            </Text>

            <text style={styles.footer}>
                ~ Obrigado a você por comprar conosco. ~
            </text>
        </Page>
    </Document>
);

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        fontSize: 14,
        margin: 12,
        textAlign: "justify",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "gray",
    },
    footer: {
        padding: "100px",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "gray",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "gray",
    },
});

export default Invoice;
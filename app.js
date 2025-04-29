
class Pedido {
    constructor(nombre, contenido, precio) {
        this.nombre = nombre;
        this.contenido = contenido;
        this.precio = precio;
    }
}

const nombres = [
    'Big Mac',
    'Cuarto de Libra con Queso',
    'McPollo',
    'McNífica Doble',
    'Triple Bacon',
    'Cheeseburger',
    'Hamburguesa',
    'Doble Cuarto de Libra'
];

const tipos = [
    'pan con semillas, dos carnes, salsa especial, lechuga, queso, pepinillos y cebolla',
    'pan, carne, queso cheddar, cebolla y ketchup',
    'pollo rebozado con mayonesa y lechuga',
    'doble carne, bacon, queso cheddar, tomate y lechuga',
    'tres carnes, bacon y queso cheddar fundido',
    'carne con queso cheddar, pepinillos y ketchup',
    'carne simple con pan tradicional',
    'doble carne con doble queso cheddar y cebolla fresca'
];

const precios = [5800, 6000, 5100, 6700, 7500, 3500, 3000, 7200];

const seleccionarAleatorio = array => array[Math.floor(Math.random() * array.length)];
const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));
const actualizarEstadoPedido = (pedido, estado) => console.log(`${pedido.nombre}: ${estado}`);

const seguirProcesoPedido = async pedido => {
    await esperar(1000);
    actualizarEstadoPedido(pedido, 'Recibido');
    await esperar(3000);
    actualizarEstadoPedido(pedido, 'Preparando');
    await esperar(1000);
    actualizarEstadoPedido(pedido, 'Finalizado');
    await esperar(1000);
    actualizarEstadoPedido(pedido, 'Entregado');
};

const realizarPedido = async pedido => {
    const retraso = Math.floor(Math.random() * 10) + 1;
    await esperar(retraso * 1000);
    console.log(`${pedido.nombre}: Pedido enviado con éxito (retraso de ${retraso} segundos)`);
    return `Pedido completado en ${retraso} segundos`;
};

const generarPedidoAleatorio = i => {
    const nombre = `Pedido ${i}`;
    const contenido = `${seleccionarAleatorio(nombres)} con ${seleccionarAleatorio(tipos)}`;
    const precio = seleccionarAleatorio(precios);
    return new Pedido(nombre, contenido, precio);
};

const manejarPedido = async i => {
    const pedido = generarPedidoAleatorio(i);
    console.log(`\nCreando ${pedido.nombre}: ${pedido.contenido} - $${pedido.precio}`);
    await realizarPedido(pedido);
    await seguirProcesoPedido(pedido);
};

const generarPedidosContinuamente = async () => {
    let i = 1;
    while (true) {
        await manejarPedido(i);
        const pausa = Math.floor(Math.random() * 10) + 1;
        await esperar(pausa * 1000);
        i++;
    }
};

generarPedidosContinuamente();

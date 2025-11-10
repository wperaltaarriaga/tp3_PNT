import axios from 'axios'

class ServicioProductos {
    #url = ''
    constructor() {
        this.#url = 'https://6910ac527686c0e9c20b576b.mockapi.io/api/productos';
    }

    //GET
    getAll = async () => {
        try {
            const { data: productos } = await axios.get(this.#url);
            return productos;
        } catch (error) {
            console.log('Error productos GET', error.message);
        }
    }

    //POST
    post = async (producto) => {
        try {
            const { data: productoGuardado } = await axios.post(this.#url, producto);
            return productoGuardado;
        } catch (error) {
            console.log('Error productos POST', error.message);
        }
    }

}

export default ServicioProductos; // Exporta la clase,
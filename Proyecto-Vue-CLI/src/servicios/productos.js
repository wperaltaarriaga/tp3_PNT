import axios from 'axios'

class ServicioProductos {
    #url = ''
    constructor() {
        this.#url = 'https://6910ac527686c0e9c20b576b.mockapi.io/api/APItp3';
    }

    //GET
    getAll = async () => {
        try {
            const { data: datos } = await axios.get(this.#url);
            return datos;
        } catch (error) {
            console.log('Error productos GET', error.message);
        }
    }

    //POST
    post = async (datos) => {
        try {
            const { data: datoGuardado } = await axios.post(this.#url, producto);
            return datoGuardado;
        } catch (error) {
            console.log('Error productos POST', error.message);
        }
    }

}

export default ServicioProductos; // Exporta la clase,
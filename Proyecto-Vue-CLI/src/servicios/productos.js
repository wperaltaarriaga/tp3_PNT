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
    post = async (dato) => {
        try {
            const response= await axios.post(this.#url, dato);
            return response.data;
        } catch (error) {
            console.log('Error productos POST', error.message);
        }
    }

}

export default ServicioProductos; // Exporta la clase,
    <template>
        <section class="card">
            <div class="card-header">
                <h3>Componente API </h3>
            </div>
            <div class="card-body">

                <form @submit.prevent="enviar"> 

                  <!-- campo nombre -->
                   <div class="form-group">
                      <label for="nombre">nombre</label>
                      <input type="text" id="nombre" class="form-control mb-2" 
                        v-model.trim="dato.nombre"
                        @input="datoDirty.nombre = true"  
                      /> <!-- Escucha el evento input (cuando el usuario escribe algo) y marca productoDirty.nombre como true. Esto indica que el campo ha sido modificado. -->
                      
                      <div  v-if="errorNombre.mostrar" class="alert alert-danger"> <!-- cartel validacion -->
                        {{ errorNombre.mensaje }}
                      </div>
                   </div>

                   <!-- campo edad -->
                   <div class="form-group">
                    <label for="edad">edad</label>
                    <input type="number" id="edad" class="form-control mb-2" 
                      v-model.number="dato.edad"
                      @input="datoDirty.edad = true"  
                    />                     
                    <div  v-if="errorEdad.mostrar" class="alert alert-danger">
                      {{errorEdad.mensaje}} 
                    </div>                   
                   </div>


<!--                   campo email
                  <div class="form-group">
                    <label for="email">email</label>
                    <input type="text" id="email" class="form-control mb-2" 
                      v-model.trim="dato.email"
                      @input="datoDirty.email = true"  
                    />                       
                    <div  v-if="!dato.email && datoDirty.email" class="alert alert-danger">
                      Campo requerido
                    </div>                   
                   </div>           -->

                  
                   <!-- boton de envio -->
                   <button class="btn btn-success mt-1" :disabled="estadoBotonDeshabilitado()"> Enviar </button>
                   
                </form>


              <button class="btn-primary my-3 me-2" @click="obtener"> OBTENER </button> <!-- boton para obtener datos. Vinculo el evento cliclk con la funcion -->
              <button class="btn-primary my-3 me-2" @click="datos=[]"> BORRAR </button> 
              

              <div v-if="datos.length"> 
                <div class="table-responsive">
                  <table class="table table-dark">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>edad</th>
                        <th>e-mail</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(dato, index) in datos" :key="index">
                        <td>{{ dato.id}}</td>
                        <td>{{ dato.nombre }}</td>
                        <td>{{ dato.edad }}</td>
                        <td>{{ dato.email }}</td>                     
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h4 v-else class="alert alert-info"> Pedir los datos a traves del boton Obtener</h4>
            </div>
        </section>
    </template>

<script>
import ServicioProductos from '@/servicios/productos.js';// importo el servicio de datos;
export default {
  name: 'Api', 

  components: {
  },
  props: {
  },
  data() {
    return {
      servicioProductos: new ServicioProductos(), // servicio de datos
      datos:[],// array para almacenar los posts obtenidos
      dato: this.iniForm(),
      datoDirty: this.iniForm(),
    };
  },
  computed: { 
    estadoBotonDeshabilitado(){
        return !this.errorNombre().ok || !this.errorEdad().ok;
      },
    errorNombre(){
        let mensaje = '';
        let nombre = this.dato.nombre;
        if(!nombre) mensaje = 'CAMPO REQUERIDO';
        else if(nombre.length <= 3) mensaje = 'Este campo debe poseer como minimo 3 caracteres';
        else if(nombre.length > 10) mensaje = 'Este campo debe poseer como maximo 10 caracteres';
        else if(nombre.includes(' ')) mensaje = 'El nombre no puede contener espacios intermedios';
        return{
          mensaje: mensaje,
          mostrar: mensaje !== '' && this.datoDirty.nombre,
          ok: mensaje == '',
        }
      },

      errorEdad(){
        let mensaje = '';
        let edad = this.dato.edad;
        if(!edad) mensaje = 'CAMPO REQUERIDO';
        else if(edad < 18) mensaje = 'Debe ser mayor a 18 años';
        else if(edad > 120) mensaje = 'Debe ser menor a 120 años';
        return{
          mensaje: mensaje,
          mostrar: mensaje !== '' && this.datoDirty.edad,
          ok: mensaje == '',
        }
      },

  },
  watch: {
  },
  methods: { 
    iniForm(){
      return{
          nombre: null,
          edad: null,
          email: null,
        }
    },


    /* -------- Metodos para consumir la API rest full ----------*/

    //GET 
    async obtener(){
      this.datos = await this.servicioProductos.getAll() // llamo al metodo obtenerProductos del servicio
      console.log(this.datos);
    },

    //POST
    async enviar(){
      const dato = {...this.dato} // clono el objeto producto para no mutar el original
      console.log('dato a enviar:', dato);

      //agrego producto en el recurso remoto
      const datoGuardado = await this.servicioProductos.post(dato); // llamo al metodo post del servicio para guardar el producto
      console.log('dato guardado:', datoGuardado);

      //agrego producto en la lista local
      this.datos.push(datoGuardado);  

      this.dato = this.iniForm(); // reinicio el formulario
      this.datoDirty = this.iniForm(); // reinicio el estado dirty del formulario
    },

    //PUT
    actualizar(id){
      // Lógica para actualizar un producto por su ID
    },

    //DELETE
    borrar(id){
      // Lógica para borrar un producto por su ID
    }

  },

  mounted() {
    console.log('Componente API montado.');
  },
}


</script> 
<style scoped>
    .card-header{
        background-color: rgb(80, 144, 80);
        color: rgb(246, 232, 232);
    }
    .table th{
      text-transform: uppercase;
      text-align: center ;
    }
    label{
      text-transform: capitalize;
      font-style: italic;
    }

</style>
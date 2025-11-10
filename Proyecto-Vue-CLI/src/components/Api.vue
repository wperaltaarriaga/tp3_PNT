    <template>
        <section class="card">
            <div class="card-header">
                <h3>Componente API </h3>
            </div>
            <div class="card-body">

                <form @submit.prevent="enviar"> <!-- formulario de ingreso de productos -->

                  <!-- campo nombre -->
                   <div class="form-group">
                      <label for="nombre">nombre</label>
                      <input type="text" id="nombre" class="form-control mb-2" 
                        v-model.trim="producto.nombre"
                        @input="productoDirty.nombre = true"  
                      /> <!-- Escucha el evento input (cuando el usuario escribe algo) y marca productoDirty.nombre como true. Esto indica que el campo ha sido modificado. -->
                      
                      <div  v-if="!producto.nombre && productoDirty.nombre" class="alert alert-danger"> <!-- cartel validacion -->
                        Campo requerido
                      </div>
                      <!-- Este bloque muestra un mensaje de validación si se cumplen las siguientes condiciones:
                        !producto.nombre: El campo producto.nombre está vacío.
                        productoDirty.nombre: El usuario ya interactuó con el campo (es decir, lo modificó al menos una vez). -->
                   </div>

                   <!-- campo precio -->
                   <div class="form-group">
                    <label for="precio">precio</label>
                    <input type="number" id="precio" class="form-control mb-2" 
                      v-model.number="producto.precio"
                      @input="productoDirty.precio = true"  
                    />   
                    <!-- cartel validacion -->                   
                    <div  v-if="!producto.precio && productoDirty.precio" class="alert alert-danger">
                      Campo requerido
                    </div>                   
                   </div>

                  <!-- campo stock -->
                  <div class="form-group">
                    <label for="stock">stock</label>
                    <input type="number" id="stock" class="form-control mb-2" 
                      v-model.number="producto.stock"
                      @input="productoDirty.stock = true"  
                    />   
                    <!-- cartel validacion -->                   
                    <div  v-if="!producto.stock && productoDirty.stock" class="alert alert-danger"> 
                      Campo requerido
                    </div>                   
                  </div>

                  <!-- campo marca -->
                  <div class="form-group">
                    <label for="marca">marca</label>
                    <input type="text" id="marca" class="form-control mb-2" 
                      v-model.trim="producto.marca"
                      @input="productoDirty.marca = true"  
                    />   
                    <!-- cartel validacion -->                   
                    <div  v-if="!producto.marca && productoDirty.marca" class="alert alert-danger">
                      Campo requerido
                    </div>                   
                   </div>

                  <!-- campo categoria -->
                  <div class="form-group">
                    <label for="categoria">categoria</label>
                    <input type="text" id="categoria" class="form-control mb-2" 
                      v-model.trim="producto.categoria"
                      @input="productoDirty.categoria = true"  
                    />   
                    <!-- cartel validacion -->                   
                    <div  v-if="!producto.categoria && productoDirty.categoria" class="alert alert-danger">
                      Campo requerido
                    </div>                   
                  </div>

                  <!-- campo detalles -->
                  <div class="form-group">
                    <label for="detalles">detalles</label>
                    <input type="text" id="detalles" class="form-control mb-2" 
                      v-model.trim="producto.detalles"
                      @input="productoDirty.detalles = true"  
                    />   
                    <!-- cartel validacion -->                   
                    <div  v-if="!producto.detalles && productoDirty.detalles" class="alert alert-danger">
                      Campo requerido
                    </div>                   
                  </div>

                  <!-- campo foto -->
                  <div class="form-group">
                    <label for="foto">foto</label>
                    <input type="text" id="foto" class="form-control mb-2" 
                      v-model.trim="producto.foto"
                      @input="productoDirty.foto = true"  
                    />   
                    <!-- cartel validacion -->                   
                    <div  v-if="!producto.foto && productoDirty.foto" class="alert alert-danger">
                      Campo requerido
                    </div>                   
                  </div>

                  <!-- campo envio -->
                  <div class="form-check my-3">
                    <input type="checkbox" id="envio" class="form-check-input" 
                      v-model.trim="producto.envio"
                    /> 
                    <label for="envio">envio</label>                  
                  </div>

                   <!-- boton de envio -->
                  <button  class="btn btn-success mt-1" :disabled="algunCampoNoValido" > Enviar </button>
                   
                </form>


              <button class="btn-primary my-3 me-2" @click="obtener"> OBTENER </button> <!-- boton para obtener datos. Vinculo el evento cliclk con la funcion -->
              <button class="btn-primary my-3 me-2" @click="productos=[]"> BORRAR </button> 
              
              <!-- 
              "nombre": "Ball",
              "precio": "157.99",
              "stock": 57,
              "marca": "Computers",
              "categoria": "Handmade Metal Chips",
              "detalles": "Savor the savory essence in our Ball, designed for glum culinary adventures",
              "foto": "https://avatars.githubusercontent.com/u/56204506",
              "envio": false,
              "id": "1"
               -->
              <div v-if="productos.length"> 
                <div class="table-responsive">
                  <table class="table table-dark">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>precio</th>
                        <th>stock</th>
                        <th>marca</th>
                        <th>categoría</th>
                        <th>detalles</th>
                        <th>foto</th>
                        <th>envío</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(producto, index) in productos" :key="index">
                        <td>{{ producto.id}}</td>
                        <td>{{ producto.nombre }}</td>
                        <td>{{ producto.precio }}</td>
                        <td>{{ producto.stock }}</td>
                        <td>{{producto.marca}}</td>
                        <td>{{producto.categoria}}</td>
                        <td>{{producto.detalles}}</td>
                        <td>
                          <img :src="producto.foto" height="100" alt="Foto Producto"/>
                        </td>
                        <td>{{producto.envio? 'Si' : 'No'}}</td>                        
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h4 v-else class="alert alert-info"> Pedir los productos a traves del boton Obtener</h4>
            </div>
        </section>
    </template>

<script>
import ServicioProductos from '@/servicios/productos.js';// importo el servicio de productos;
export default {
  name: 'Api', 

  components: {
  },
  props: {
  },
  data() {
    return {
      servicioProductos: new ServicioProductos(), // servicio de productos
      productos:[],// array para almacenar los posts obtenidos
      producto: this.iniForm(),
      productoDirty: this.iniForm(),
    };
  },
  computed: { 
    algunCampoNoValido(){
      return Object.entries(this.producto).filter(e => e[0]!='envio' ? !e[1]: false).length  // devuelve true si algun campo (excepto envio) es invalido (null, undefined, vacio
     // return !this.producto.nombre || !this.producto.precio || !this.producto.stock || !this.producto.marca || !this.producto.categoria || !this.producto.detalles || !this.producto.foto || this.producto.envio === null
    }
  },
  watch: {
  },
  methods: { 
    iniForm(){
      return{
          nombre: null,
          precio: null,
          stock: null,
          marca: null,
          categoria: null,
          detalles: null,
          foto: null,
          envio: false,
        }
    },


    /* -------- Metodos para consumir la API rest full ------------*/

    //GET 
    async obtener(){
      this.productos = await this.servicioProductos.getAll() // llamo al metodo obtenerProductos del servicio
      console.log(this.productos);
    },

    //POST
    async enviar(){
      const producto = {...this.producto} // clono el objeto producto para no mutar el original
      console.log('Producto a enviar:', producto);

      //agrego producto en el recurso remoto
      const productoGuardado = await this.servicioProductos.post(producto); // llamo al metodo post del servicio para guardar el producto
      console.log('Producto guardado:', productoGuardado);

      //agrego producto en la lista local
      this.productos.push(productoGuardado);  

      this.producto = this.iniForm(); // reinicio el formulario
      this.productoDirty = this.iniForm(); // reinicio el estado dirty del formulario
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
import { Injectable } from '@angular/core';
import { Comida } from '../models/comida.model';
import { Categoria } from '../models/categoria.model';
import { Adicional } from '../models/adicional.model';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  constructor() {
    this.inicializarDatos();
  }

  private categorias: Categoria[] = [];
  // Un único arreglo de comidas
  private comidasArray: Comida[] = [];

  private inicializarDatos() {
    // 1. Categorías representativas
    const catTacos = new Categoria(
      1,
      'Tacos',
      'Variedad de tacos tradicionales servidos en tortilla de maíz o harina con ingredientes frescos.',
      true,
    );
    const catQuesadillas = new Categoria(
      2,
      'Quesadillas',
      'Muestras de queso fundido e ingredientes variados en tortillas a la plancha.',
      true,
    );
    const catEntradas = new Categoria(
      3,
      'Entradas',
      'Platos ideales para comenzar la experiencia o compartir en la mesa.',
      true,
    );
    const catEspecialidades = new Categoria(
      4,
      'Especialidades',
      'Platos insignia del restaurante preparados con recetas exclusivas de la casa.',
      true,
    );
    const catBurritos = new Categoria(
      5,
      'Burritos',
      'Tortillas de harina gigantes rellenas de carne, frijoles, arroz y complementos.',
      true,
    );

    this.categorias = [
      catTacos,
      catQuesadillas,
      catEntradas,
      catEspecialidades,
      catBurritos,
    ];

    // Adicionales
    const adicQueso = new Adicional(1, 'Queso Oaxaca Extra', 3500, true);
    const adicGuacamole = new Adicional(2, 'Porción de Guacamole', 4500, true);
    const adicPico = new Adicional(3, 'Pico de Gallo Artesanal', 2500, true);
    const adicJalapenos = new Adicional(4, 'Jalapeños Toreados', 2000, true);
    const adicSalsa = new Adicional(
      5,
      'Salsa Habanero Extra Picante',
      2000,
      true,
    );
    const adicFrijol = new Adicional(
      6,
      'Frijoles Refritos con Totopos',
      3500,
      true,
    );

    catTacos.adicionales = [adicQueso, adicGuacamole, adicPico, adicSalsa];
    catQuesadillas.adicionales = [
      adicQueso,
      adicGuacamole,
      adicPico,
      adicJalapenos,
    ];
    catEntradas.adicionales = [adicGuacamole, adicQueso, adicFrijol];
    catEspecialidades.adicionales = [
      adicQueso,
      adicGuacamole,
      adicSalsa,
      adicFrijol,
    ];
    catBurritos.adicionales = [
      adicQueso,
      adicGuacamole,
      adicJalapenos,
      adicPico,
    ];

    // 2. Las 40 comidas del DataLoader en un único arreglo
    this.comidasArray = [
      new Comida(
        1,
        'Tacos al Pastor',
        18000,
        'Carne de cerdo marinada en achiote tradicional, piña asada al carbón, cilantro fresco y cebolla en tortilla de maíz nixtamalizada.',
        '/images/comidas/tacos-al-pastor.jpg',
        'Estrella',
        true,
        catTacos,
      ),
      new Comida(
        2,
        'Quesadilla de Birria',
        22000,
        'Tortilla de maíz rellena de queso Oaxaca fundido y jugosa birria de res cocinada a fuego lento por 8 horas. Acompañada de consomé para sumergir.',
        '/images/comidas/quesadilla-de-birria.jpg',
        'Top Ventas',
        true,
        catQuesadillas,
      ),
      new Comida(
        3,
        'Guacamole El Wey',
        15000,
        'Aguacate Hass seleccionado machacado al momento en molcajete con tomate, jalapeño, cilantro y toque de limón. Servido con totopos artesanales crujientes.',
        '/images/comidas/guacamole-el-wey.jpg',
        'Vegano',
        true,
        catEntradas,
      ),
      new Comida(
        4,
        'Enchiladas Rojas',
        20000,
        'Tres tortillas de maíz rellenas de pechuga de pollo deshebrada, bañadas en salsa roja de chiles secos, cubiertas con crema ácida, queso fresco y cebolla morada.',
        '/images/comidas/enchiladas-rojas.jpg',
        'Recomendado',
        true,
        catEspecialidades,
      ),
      new Comida(
        5,
        'Burrito Norteño',
        24000,
        'Tortilla de harina gigante rellena de carne asada al carbón, frijoles refritos bayos, arroz a la mexicana, queso Chihuahua fundido y pico de gallo.',
        '/images/comidas/burrito-norteno.jpg',
        'Grande',
        true,
        catBurritos,
      ),
      new Comida(
        6,
        'Tacos de Suadero',
        19000,
        'Corte suave de res confitado lentamente en su propia grasa estilo CDMX, picado al momento con cilantro criollo, cebolla y salsa taquera verde.',
        '/images/comidas/tacos-de-suadero.jpg',
        'Clásico',
        true,
        catTacos,
      ),
      new Comida(
        7,
        'Nachos El Wey',
        23000,
        'Cama abundante de totopos de maíz crujientes, frijoles refritos, abundante queso fundido Oaxaca y Cheddar, pico de gallo fresco, jalapeños en escabeche, crema ácida y guacamole especial.',
        '/images/comidas/nachos-el-wey.jpg',
        'Para Compartir',
        true,
        catEntradas,
      ),
      new Comida(
        8,
        'Gringa con Carne (la favorita de jaimes)',
        21000,
        'Deliciosa quesadilla en tortilla de harina dorada a la plancha con mantequilla, rellena de abundante carne al pastor, queso Oaxaca derretido, piña asada caramelizada y cilantro fresco.',
        '/images/comidas/gringa-con-carne.jpg',
        'Favorito',
        true,
        catQuesadillas,
      ),
      new Comida(
        9,
        'Tacos de Carnitas Michoacán',
        19500,
        'Auténtico plato de Tacos de Carnitas Michoacán elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tacos-carnitas-michoacan.jpg',
        'Tradicional',
        true,
        catTacos,
      ),
      new Comida(
        10,
        'Tacos de Pescado Baja',
        23000,
        'Auténtico plato de Tacos de Pescado Baja elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tacos-pescado-baja.jpg',
        'Costeño',
        true,
        catTacos,
      ),
      new Comida(
        11,
        'Tacos Gobernador',
        25000,
        'Auténtico plato de Tacos Gobernador elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tacos-gobernador.jpg',
        'Mariscos',
        true,
        catTacos,
      ),
      new Comida(
        12,
        'Tacos de Cochinita Pibil',
        20000,
        'Auténtico plato de Tacos de Cochinita Pibil elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tacos-cochinita-pibil.jpg',
        'Yucateco',
        true,
        catTacos,
      ),
      new Comida(
        13,
        'Tacos de Barbacoa Hidalguense',
        22500,
        'Auténtico plato de Tacos de Barbacoa Hidalguense elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tacos-barbacoa-hidalguense.jpg',
        'Campestre',
        true,
        catTacos,
      ),
      new Comida(
        14,
        'Tacos de Rib Eye con Tuétano',
        28000,
        'Auténtico plato de Tacos de Rib Eye con Tuétano elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tacos-ribeye-tuetano.jpg',
        'Gourmet',
        true,
        catTacos,
      ),
      new Comida(
        15,
        'Tacos de Chicharrón en Salsa Verde',
        18500,
        'Auténtico plato de Tacos de Chicharrón en Salsa Verde elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tacos-chicharron-verde.jpg',
        'Picante',
        true,
        catTacos,
      ),
      new Comida(
        16,
        'Tacos de Asada Poblana',
        21000,
        'Auténtico plato de Tacos de Asada Poblana elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tacos-asada-poblana.jpg',
        'Casero',
        true,
        catTacos,
      ),
      new Comida(
        17,
        'Quesadilla de Flor de Calabaza',
        16000,
        'Auténtico plato de Quesadilla de Flor de Calabaza elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/quesadilla-flor-calabaza.jpg',
        'Vegetariano',
        true,
        catQuesadillas,
      ),
      new Comida(
        18,
        'Quesadilla de Champiñones al Ajillo',
        17000,
        'Auténtico plato de Quesadilla de Champiñones al Ajillo elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/quesadilla-champinones.jpg',
        'Ligero',
        true,
        catQuesadillas,
      ),
      new Comida(
        19,
        'Quesadilla Sincronizada',
        18000,
        'Auténtico plato de Quesadilla Sincronizada elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/quesadilla-sincronizada.jpg',
        'Especial',
        true,
        catQuesadillas,
      ),
      new Comida(
        20,
        'Quesadilla de Chicharrón Prensado',
        19000,
        'Auténtico plato de Quesadilla de Chicharrón Prensado elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/quesadilla-chicharron-prensado.jpg',
        'Frito',
        true,
        catQuesadillas,
      ),
      new Comida(
        21,
        'Quesadilla Norteña con Arrachera',
        24000,
        'Auténtico plato de Quesadilla Norteña con Arrachera elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/quesadilla-nortena-arrachera.jpg',
        'Parrilla',
        true,
        catQuesadillas,
      ),
      new Comida(
        22,
        'Quesadilla de Tinga Poblana',
        19500,
        'Auténtico plato de Quesadilla de Tinga Poblana elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/quesadilla-tinga-poblana.jpg',
        'Sabor Único',
        true,
        catQuesadillas,
      ),
      new Comida(
        23,
        'Totopos con Queso Fundido y Rajas',
        14000,
        'Auténtico plato de Totopos con Queso Fundido y Rajas elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/totopos-queso-fundido.jpg',
        'Crujiente',
        true,
        catEntradas,
      ),
      new Comida(
        24,
        'Esquites Callejeros con Epazote',
        12000,
        'Auténtico plato de Esquites Callejeros con Epazote elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/esquites-callejeros.jpg',
        'Callejero',
        true,
        catEntradas,
      ),
      new Comida(
        25,
        'Queso Fundido con Chorizo Casero',
        19000,
        'Auténtico plato de Queso Fundido con Chorizo Casero elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/queso-fundido-chorizo.jpg',
        'Queso',
        true,
        catEntradas,
      ),
      new Comida(
        26,
        'Flautas Doradas de Pollo',
        17500,
        'Auténtico plato de Flautas Doradas de Pollo elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/flautas-doradas-pollo.jpg',
        'Dorado',
        true,
        catEntradas,
      ),
      new Comida(
        27,
        'Sopes Tradicionales con Cecina',
        18000,
        'Auténtico plato de Sopes Tradicionales con Cecina elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/sopes-tradicionales-cecina.jpg',
        'Rústico',
        true,
        catEntradas,
      ),
      new Comida(
        28,
        'Tostadas de Tinga con Crema',
        16500,
        'Auténtico plato de Tostadas de Tinga con Crema elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tostadas-tinga-crema.jpg',
        'Fresco',
        true,
        catEntradas,
      ),
      new Comida(
        29,
        'Chiles en Nogada de Puebla',
        32000,
        'Auténtico plato de Chiles en Nogada de Puebla elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/chiles-en-nogada.jpg',
        'Poblano',
        true,
        catEspecialidades,
      ),
      new Comida(
        30,
        'Pozole Rojo Tradicional',
        26000,
        'Auténtico plato de Pozole Rojo Tradicional elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/pozole-rojo.jpg',
        'Patrio',
        true,
        catEspecialidades,
      ),
      new Comida(
        31,
        'Mole Poblano con Pollo',
        27000,
        'Auténtico plato de Mole Poblano con Pollo elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/mole-poblano.jpg',
        'Artesanal',
        true,
        catEspecialidades,
      ),
      new Comida(
        32,
        'Tamal Oaxaqueño en Hoja de Plátano',
        14000,
        'Auténtico plato de Tamal Oaxaqueño en Hoja de Plátano elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/tamal-oaxaqueno.jpg',
        'Del Sur',
        true,
        catEspecialidades,
      ),
      new Comida(
        33,
        'Fajitas Mixtas al Carbón',
        29000,
        'Auténtico plato de Fajitas Mixtas al Carbón elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/fajitas-mixtas-carbon.jpg',
        'Al Carbón',
        true,
        catEspecialidades,
      ),
      new Comida(
        34,
        'Cochinita Pibil en Plato Hondo',
        26000,
        'Auténtico plato de Cochinita Pibil en Plato Hondo elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/cochinita-pibil-plato.jpg',
        'Horneado',
        true,
        catEspecialidades,
      ),
      new Comida(
        35,
        'Birria Tapatía de Res en Cazuela',
        27500,
        'Auténtico plato de Birria Tapatía de Res en Cazuela elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/birria-tapatia-cazuela.jpg',
        'Caliente',
        true,
        catEspecialidades,
      ),
      new Comida(
        36,
        'Alambre Mixto de Res y Tocino',
        28000,
        'Auténtico plato de Alambre Mixto de Res y Tocino elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/alambre-mixto-res.jpg',
        'Abundante',
        true,
        catEspecialidades,
      ),
      new Comida(
        37,
        'Burrito California con Papas',
        25000,
        'Auténtico plato de Burrito California con Papas elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/burrito-california-papas.jpg',
        'Estilo USA',
        true,
        catBurritos,
      ),
      new Comida(
        38,
        'Burrito de Tinga Deshebrada',
        22000,
        'Auténtico plato de Burrito de Tinga Deshebrada elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/burrito-tinga-deshebrada.jpg',
        'Deshebrada',
        true,
        catBurritos,
      ),
      new Comida(
        39,
        'Burrito al Pastor con Queso',
        23500,
        'Auténtico plato de Burrito al Pastor con Queso elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/burrito-pastor-queso.jpg',
        'Pastor',
        true,
        catBurritos,
      ),
      new Comida(
        40,
        'Burrito Vegetariano con Frijol Negro',
        20000,
        'Auténtico plato de Burrito Vegetariano con Frijol Negro elaborado con ingredientes de la más alta calidad mexicana.',
        '/images/comidas/burrito-vegetariano.jpg',
        'Saludable',
        true,
        catBurritos,
      ),
    ];
  }

  getComidas(): Comida[] {
    return this.comidasArray;
  }

  getComidaById(id: number): Comida | undefined {
    return this.comidasArray.find((c) => c.id === id);
  }

  getCategorias(): Categoria[] {
    return this.categorias;
  }

  addComida(comida: Comida): void {
    const maxId =
      this.comidasArray.length > 0
        ? Math.max(...this.comidasArray.map((c) => c.id))
        : 0;
    comida.id = maxId + 1;
    this.comidasArray.push(comida);
  }

  updateComida(id: number, comida: Comida): void {
    comida.id = id;
    const index = this.comidasArray.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.comidasArray[index] = comida;
    }
  }

  eliminarComida(id: number): void {
    const index = this.comidasArray.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.comidasArray.splice(index, 1);
    }
  }
}

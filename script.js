const recipes = [
  {
    id: "brownies_de_chocolate",
    theme: "theme-brownie",
    title: "Brownies de Chocolate",
    subtitle: "\"Cuadrados perfectos de pura felicidad\"",
    image: "Fotos/trufas.jpg", // This seems to be the only image available for cards
    description: "Cuadrados de chocolate intensos y cremosos, un clásico que nunca falla.",
    audio: "Audios/Audio_1.mp3",
    infoCards: [
      { icon: "fa-clock", text: "40 min" },
      { icon: "fa-users", text: "8 porciones" },
      { icon: "fa-star", text: "Fácil", stars: [true, true, false] },
      { icon: "fa-fire", text: "180°C" }
    ],
    loveMessage: {
      title: "El secreto de los brownies perfectos 🍫",
      icon: "fa-heart",
      text: "Los brownies nacieron por accidente en 1893 en Chicago. Una chef del Palmer House Hotel olvidó agregar levadura a su pastel de chocolate, pero el resultado fue tan delicioso que se convirtió en un clásico. La clave está en el <strong>punto exacto de cocción</strong>: ni muy húmedos ni muy secos. El palito de madera debe salir con algunas migas húmedas pegadas para lograr esa textura perfecta entre cremoso y firme."
    },
    bakingMode: {
      buttonText: "Activar Modo Horneado"
    },
    ingredients: {
      title: "Ingredientes del Éxito",
      items: [
        { amount: "100g", name: "Margarina", visual: "🧈", description: "Para la textura cremosa perfecta" },
        { amount: "100g", name: "Chocolate semiamargo", visual: "🍫", description: "El corazón chocolatoso de nuestros brownies" },
        { amount: "120g", name: "Azúcar", visual: "🍬", description: "La dulzura perfecta" },
        { amount: "2", name: "Huevos", visual: "🥚", description: "Para la estructura y esponjosidad" },
        { amount: "60g", name: "Harina", visual: "🌾", description: "La base que une todo" },
        { amount: "", name: "Nueces picadas o chispas", visual: "🥜", description: "(Al gusto - para el toque especial)" }
      ]
    },
    instructions: {
      title: "¡Al Horno!",
      steps: [
        {
          title: "Derretir el Chocolate Mágico",
          tags: ["🍫 Chocolate", "🧈 Margarina"],
          text: "En una olla a fuego bajo o en el microondas, derrite el <strong>chocolate semiamargo</strong> junto con la <strong>margarina</strong>. Revuelve hasta obtener una mezcla lisa y brillante. ¡La base perfecta está lista!",
          tip: "Si usas microondas, hazlo en intervalos de 30 segundos."
        },
        {
          title: "Incorporar los Huevos",
          tags: ["🥚 Uno a uno", "🥄 Integrar bien"],
          text: "Cuando el chocolate esté derretido, agrega los <strong>huevos uno por uno</strong>. Integra completamente cada huevo antes de agregar el siguiente. ¡La textura se vuelve sedosa!",
          important: "Los huevos deben estar a temperatura ambiente."
        },
        {
          title: "La Dulzura Perfecta",
          tags: ["🍬 Azúcar", "✨ Homogéneo"],
          text: "Incorpora el <strong>azúcar</strong> y mezcla hasta obtener una <span class='font-bold text-amber-900 underline decoration-wavy decoration-amber-500'>mezcla homogénea</span>. La mezcla debe verse brillante y sin grumos.",
          tooltip: "¡Perfecta integración! Este es el momento donde se forma la textura característica del brownie."
        },
        {
          title: "La Estructura Final",
          tags: ["🌾 Harina", "🥜 Extras"],
          text: "Agrega la <strong>harina</strong> tamizada y las <strong>nueces picadas o chispas</strong> al gusto. Mezcla con movimientos envolventes hasta integrar. ¡No mezcles de más!",
          tip: "Mezclar poco mantiene los brownies tiernos."
        },
        {
          title: "¡Al Horno!",
          tags: ["🔥 180°C", "⏰ 20 min"],
          text: "Vierte la mezcla en el molde engrasado y enharinado. Hornea a <strong>180°C por 20 minutos</strong> o hasta que el palito de madera salga limpio.",
          action: { type: "preheat", text: "Precalienta tu horno a 180°C (350°F)" }
        },
        {
          title: "El Toque Final",
          tags: ["❄️ Enfriar", "✨ Decorar"],
          text: "Deja enfriar completamente antes de cortar. <strong>Porciona</strong> en cuadrados perfectos y <strong>decora</strong> con manjar, chocolate derretido o tu topping favorito.",
          toppings: [
            { name: "Manjar Blanco", visual: "🍯" },
            { name: "Chocolate Derretido", visual: "🍫" },
            { name: "Nueces Picadas", visual: "🥜" },
            { name: "Azúcar Glass", visual: "✨" }
          ]
        }
      ]
    },
    completionMessage: {
      title: "¡Felicitaciones, Maestro/a Panadero/a! 👨‍🍳🍫",
      text: "Has dominado el arte de los brownies perfectos. ¡Tus cuadrados de felicidad están listos para disfrutar!",
      buttonText: "Compartir la Receta"
    },
    storageInfo: {
      title: "¡Conserva tu Obra Maestra!",
      text: "Guarda tus brownies en un recipiente hermético a temperatura ambiente. <strong>Se mantienen perfectos hasta 5 días</strong>, aunque seguramente desaparecerán mucho antes.",
      tips: [
        { visual: "🌡️", title: "Temperatura", text: "Ambiente (18-22°C) para textura óptima" },
        { visual: "📦", title: "Recipiente", text: "Hermético para mantener la humedad" },
        { visual: "📅", title: "Duración", text: "5 días de perfección chocolatosa" }
      ]
    },
    rating: {
      prompt: "¿Cómo quedaron tus brownies?",
      icon: "fa-star" // fas fa-star vs far fa-star handled in JS
    },
    modals: [
      {
        id: "shoppingModal",
        title: "🛒 Lista de Compras",
        items: [
          "🧈 Margarina - 100g", "🍫 Chocolate semiamargo - 100g", "🍬 Azúcar - 120g",
          "🥚 Huevos - 2 unidades", "🌾 Harina - 60g", "🥜 Nueces/chispas (opcional)"
        ],
        buttonText: "Descargar Lista"
      }
    ]
  },
  {
    id: "trufas_de_chocolate",
    theme: "theme-truffle",
    title: "Trufas de Chocolate",
    subtitle: "\"Pequeñas joyas de felicidad chocolatada\"",
    image: "Fotos/trufas.jpg",
    description: "Pequeñas joyas de felicidad chocolatada, ideales para una tarde dulce.",
    audio: "Audios/Audio_1.mp3",
    infoCards: [
      { icon: "fa-clock", text: "30 min" },
      { icon: "fa-users", text: "4 porciones" },
      { icon: "fa-star", text: "Fácil", stars: [true, true, false] }
    ],
    loveMessage: {
      title: "Dato curioso mi reina hermosa ❤️",
      icon: "fa-heart",
      text: "La trufa de chocolate nació en Francia en 1895 por necesidad. Un pastelero llamado Louis Dufour se quedó sin dulces para vender y, en un apuro, mezcló los ingredientes que le quedaban (crema y cacao) y formó unas bolitas rústicas. Las cubrió con más cacao en polvo y su apariencia le recordó a las valiosas trufas negras recién sacadas de la tierra, de ahí su nombre."
    },
    bakingMode: {
      buttonText: "Activar Modo Chef"
    },
    ingredients: {
      title: "Ingredientes Mágicos",
      items: [
        { amount: "200g", name: "Leche condensada", visual: "🥛", description: "La base cremosa de nuestras trufas" },
        { amount: "100g", name: "Cocoa en polvo", visual: "🍫", description: "El alma chocolatosa que buscamos" },
        { amount: "1 cucharada", name: "Margarina", visual: "🧈", description: "Para el brillo perfecto" },
        { amount: "", name: "Crema de leche", visual: "🥛", description: "(Opcional - para extra cremosidad)" }
      ]
    },
    instructions: {
      title: "¡Manos a la Obra!",
      steps: [
        {
          title: "Preparar la Base Mágica",
          tags: ["🥛 Leche", "🍫 Cocoa"],
          text: "En una olla, vierte la <strong>leche condensada</strong> y la <strong>cocoa en polvo</strong>. ¡Que comience la magia! Mezcla suavemente hasta que no queden grumos.",
          tip: "Usa una cuchara de madera para mejores resultados."
        },
        {
          title: "¡A Bailar con el Fuego!",
          tags: ["🔥 Fuego medio", "🥄 Sin parar"],
          text: "A fuego medio-alto, <strong>baila con tu espátula sin parar</strong> para que la mezcla no se pegue. ¡Es como una danza de amor en la cocina!",
          important: "No dejes de mover ni un segundo, tu amor lo vale."
        },
        {
          title: "El Momento Moisés",
          tags: ["🧈 Margarina", "📏 Punto perfecto"],
          text: "Al espesar, añade la <strong>margarina</strong>. El show termina al llegar al <span class='font-bold text-amber-900 underline decoration-wavy decoration-amber-500'>punto Moisés</span>.",
          tooltip: "¡Como abrir el Mar Rojo! Pasa la espátula por el centro y se forma un 'camino' que tarda unos segundos en cerrarse.",
          action: { type: "video", text: "Ver Demo del Punto Moisés", video: "Videos/punto_moises.mp4" }
        },
        {
          title: "Paciencia y Refrigeración",
          tags: ["❄️ 1 hora", "🧊 Bien frío"],
          text: "Deja que se enfríe naturalmente y luego, ¡al refri! Dale al menos <strong>1 hora</strong> para que se ponga firme y moldeable.",
          tip: "Mientras esperas, puedes preparar los toppings."
        },
        {
          title: "¡Arte Comestible!",
          tags: ["🎨 Creatividad", "✨ Decoración"],
          text: "Forma bolitas perfectas con tus manos (húmedas para evitar que se peguen) y <strong>rebózalas</strong> en una lluvia de chispas, nueces, coco rallado, o lo que tu corazón desee.",
          toppings: [
            { name: "Chispas de Chocolate", visual: "🍫" },
            { name: "Nueces Picadas", visual: "🥜" },
            { name: "Coco Rallado", visual: "🥥" },
            { name: "Fresas Picadas", visual: "🍓" }
          ]
        }
      ]
    },
    completionMessage: {
      title: "¡Felicitaciones, Chef del Amor! 👨‍🍳💕",
      text: "Has completado la receta perfecta. ¡Tus trufas están listas para enamorar!",
      buttonText: "Compartir el Amor"
    },
    storageInfo: {
      title: "¡Coronación del Sabor!",
      text: "Guárdalas como un tesoro en un cofre hermético (o tupper) en el refrigerador. <strong>Duran hasta 5 días</strong>, ¡aunque seguro no resistirás tanto tiempo sin probarlas!",
      tips: [
        { visual: "🧊", title: "Refrigeración", text: "Mantén entre 2-4°C para textura perfecta" },
        { visual: "📦", title: "Recipiente", text: "Usa contenedor hermético para frescura" },
        { visual: "⏰", title: "Duración", text: "Hasta 5 días de dulce perfección" }
      ]
    },
    rating: {
      prompt: "¿Cómo quedaron tus trufas mi reina?",
      icon: "fa-heart"
    },
    modals: [
      {
        id: "shoppingModal",
        title: "🛒 Lista de Compras",
        items: [
          "🥛 Leche condensada - 200g", "🍫 Cocoa en polvo - 100g",
          "🧈 Margarina - 1 cucharada", "🥛 Crema de leche (opcional)"
        ],
        buttonText: "Descargar Lista"
      },
      {
        id: "moisesModal",
        title: "🌊 Punto Moisés - Demo Visual",
        video: "Videos/punto_moises.mp4",
        description: "¿Cómo saber cuándo está listo? Pasa la espátula por el centro de la mezcla. Se debe formar un 'camino' que tarde en cerrarse. La consistencia debe ser firme pero cremosa."
      }
    ]
  }
];

// --- No necesitas editar nada debajo de esta línea ---

// This function is for the index.html page to build the recipe cards
function buildRecipeCards() {
  const recipeListContainer = document.getElementById('recipe-list');
  if (!recipeListContainer) return; // Not on the index page

  if (recipes.length === 0) {
      recipeListContainer.innerHTML = `<p class="text-center text-amber-700 col-span-full">Aún no has añadido ninguna receta. ¡Abre el archivo <strong>script.js</strong> para empezar!</p>`;
      return;
  }

  let htmlContent = '';
  recipes.forEach(recipe => {
    const placeholderImage = "https://placehold.co/600x400/F3E5AB/5D4037?text=Receta";
    // The link now points to the template with a URL parameter
    htmlContent += `
      <a href="recipe-template.html?id=${recipe.id}" class="recipe-card bg-white rounded-2xl shadow-lg overflow-hidden block">
          <img class="w-full h-48 object-cover" src="${recipe.image || placeholderImage}" alt="Imagen de ${recipe.title}">
          <div class="p-6">
              <h2 class="font-heading text-2xl text-amber-900 mb-2">${recipe.title}</h2>
              <p class="text-gray-600">${recipe.description}</p>
          </div>
          <div class="px-6 pb-4">
              <span class="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full">Ver receta</span>
          </div>
      </a>
    `;
  });
  recipeListContainer.innerHTML = htmlContent;
}

// Run the function to build cards on the index page
window.addEventListener('DOMContentLoaded', buildRecipeCards);

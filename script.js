// --- ¡Hola! Este es el archivo de configuración de tus recetas ---
// Para agregar una nueva receta a la página principal,
// simplemente añade un nuevo objeto a la lista de abajo.

// Sigue este formato:
// {
//   file: "nombre-del-archivo.html",
//   title: "Título de la Receta",
//   description: "Una descripción corta y apetitosa.",
//   image: "https://placehold.co/600x400/F3E5AB/5D4037?text=Postre" // Opcional: puedes poner una URL de una imagen
// },
// No olvides la coma "," después de cada llave "}", excepto en la última.

const recipes = [
  {
    file: "trufas_de_chocolate.html",
    title: "Trufas de Chocolate Mágicas",
    description: "Pequeñas joyas de felicidad chocolatada, ideales para una tarde dulce.",
    image: "Fotos/trufas.jpg"
  },
  // --- AGREGA TUS NUEVAS RECETAS AQUÍ ---
  // Ejemplo:
  // {
  //   file: "mi-nueva-receta.html",
  //   title: "Mi Nueva Receta Deliciosa",
  //   description: "El plato perfecto para sorprender a todos en casa.",
  //   image: "https://placehold.co/600x400/34D399/FFFFFF?text=Nuevo"
  // },

];

// --- No necesitas editar nada debajo de esta línea ---

window.addEventListener('DOMContentLoaded', () => {
  const recipeListContainer = document.getElementById('recipe-list');
  if (recipeListContainer) {
    if (recipes.length === 0) {
        recipeListContainer.innerHTML = `<p class="text-center text-amber-700 col-span-full">Aún no has añadido ninguna receta. ¡Abre el archivo <strong>script.js</strong> para empezar!</p>`;
        return;
    }

    let htmlContent = '';
    recipes.forEach(recipe => {
      const placeholderImage = "https://placehold.co/600x400/F3E5AB/5D4037?text=Receta";
      htmlContent += `
        <a href="${recipe.file}" class="recipe-card bg-white rounded-2xl shadow-lg overflow-hidden block">
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
});

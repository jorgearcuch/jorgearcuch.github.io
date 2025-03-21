document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "dd58f899d13f4113804f46cb9621da2b"; 
    const url = `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`;
    const newsContainer = document.getElementById("news");

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status !== "ok") {
                throw new Error("Error en la API: " + (data.message || "Respuesta inesperada"));
            }
            if (!data.articles || data.articles.length === 0) {
                newsContainer.innerHTML = "<p class='text-center'>No se encontraron noticias.</p>";
                return;
            }
            newsContainer.innerHTML = `
                <ul class="list-group">
                    ${data.articles.slice(0, 10).map(article => `
                        <li class="list-group-item">
                            <a href="${article.url}" target="_blank">${article.title}</a>
                        </li>
                    `).join("")}
                </ul>
            `;
        })
        .catch(error => {
            console.error("Error al obtener noticias:", error);
            newsContainer.innerHTML = `<p class='text-center text-danger'>Error al cargar las noticias: ${error.message}</p>`;
        });
});

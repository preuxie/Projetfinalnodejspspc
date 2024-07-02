const button_icon = document.querySelector(".button-menu i");
const menu = document.getElementById("links-menu");

function display_menu() {
    if (menu.classList.contains("view")) {
        menu.classList.remove("view")
        button_icon.classList.add("fa-bars")
        button_icon.classList.remove("fa-times")
    }
    else {
        menu.classList.add("view")
        button_icon.classList.remove("fa-bars")
        button_icon.classList.add("fa-times")
    }
}


document.getElementById('titi').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire par défaut

    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Envoyer les données au serveur
    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json().then(result => ({
                ok: response.ok,
                message: result.message
            }));
        })
        .then(({ ok, message }) => {
            // Afficher une alerte en fonction du résultat
            alert(message);
            if (ok) {
                document.getElementById('titi').reset();
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur s\'est produite. Veuillez réessayer.');
        });
});

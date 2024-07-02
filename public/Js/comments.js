

document.addEventListener('DOMContentLoaded', function () {
   const commentsList = document.getElementById('commentsList');

   // Fonction pour charger les commentaires depuis le serveur
   function loadComments() {
       fetch('/comments')
           .then(response => response.json())
           .then(data=> {
               commentsList.innerHTML = ''; // Efface les commentaires existants

               data.forEach(comment => {
                
                 console.log(comment);
                 
                
                   const single_comment = document.createElement('div');
                  
    
                   single_comment.innerHTML =  `
                
                <div class= temoignage-rendu>
                 <div class="item-temoignage">
                <div class="text-temoignage">

        <p><i class="fa-solid fa-quote-left"></i>  ${comment.commentaires}
            <i class="fa-solid fa-quote-right"></i></p>

                </div>

                <div class="picture-client">
                
                     <img src="./Images/team.jpeg.jpg" alt="titi">


                    <div class="personne">
                        
                            <h4>${comment.name}</h4>
                        
                        <span id="element">${comment.profession}</span>
                    </div>
                </div>
                </div>
                </div>
     
                   `;
                   commentsList.appendChild(single_comment);
            });
           })
           
           .catch(error => console.error('Erreur lors du chargement des commentaires :', error));
   }

   // Charger les commentaires au chargement de la page
   loadComments();

   // Envoi d'un nouveau commentaire
   const commentForm = document.getElementById('commentForm');
   commentForm.addEventListener('submit', function (event) {
       event.preventDefault();
       const formData = new FormData(this);

       fetch('submit-comment', {
           method: 'POST',
           body: formData
       })
           .then(response => response.text())
           .then(data => {
               alert(data); // Affiche un message de confirmation
               commentForm.reset(); // Réinitialise le formulaire après l'envoi
               loadComments(); // Recharge les commentaires pour afficher le nouveau commentaire
           })
           .catch(error => console.error('Erreur lors de l\'envoi du commentaire :', error));
   });
});







                      
 




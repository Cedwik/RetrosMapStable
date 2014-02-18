//script pour afficher menu de gauche 
$(document).on('pageinit',function(){


//lorsqu'on est sur une page dans la zone (data-role=page) et que l'on balaye de la gauche vers la droite (swiperight) ça permet de faire sortir le menu de gauche
	$("[data-role='page']").on("swiperight",function(){ 
		$("#menu_gauche").panel( "open");

	}); //FIN menu gauche
	
	
	
//script pour afficher le contenu d'un onglet	
	//Le 1er onglet possède la classe 'onglet_actif'
	$('#onglet ul li a:first').addClass('onglet_actif');
	

		//Pour chaque élément ayant la class contenu_liste, exécuter la fonction suivante
	$(".contenu_liste").each(function(i){

	//Le id est maintenant le id + un dièse devant	
        this.id = "#" + this.id; 
    });
	
	//cacher les blocs de class contenu_liste sauf le 1er
    $(".contenu_liste").not(":first").hide(); 

    $("#onglet ul li a").click(function() {
	//Aspect de l'onglet si l'on est sur la page ou non		
		//retirer la classe onglet_actif 
		$('#onglet ul li a.onglet_actif').removeClass('onglet_actif');
		
		//ajout de la classe onglet_actif sur l'onglet cliqué
		$(this).addClass('onglet_actif'); 
		
	
	//on met dans la variable idTab, le lien/ancre sur lequel on clique	
        var idTab = $(this).attr("href"); 	
			
	//on cache le bloc de class contenu_liste qui est actuellement visible
        $(".contenu_liste").hide();	
		
	//affiche le bloc sur lequel on a cliqué
        $("div[id='" + idTab + "']").fadeIn(); 
		
	//annuler l'évènement du clique
        return false;
    }); //FIN gestion onglet	

});
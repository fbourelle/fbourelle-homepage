    <?php
    /*
    	********************************************************************************************
    	CONFIGURATION
    	********************************************************************************************
    */
    // destinataire est votre adresse mail. Pour envoyer à plusieurs à la fois, séparez-les par une virgule
    $destinataire = 'frederic.bourelle@gmail.com';

    // copie ? (envoie une copie au visiteur)
    $copie = 'non';

    // Action du formulaire (si votre page a des paramètres dans l'URL)
    // si cette page est index.php?page=contact alors mettez index.php?page=contact
    // sinon, laissez vide
    $form_action = '';

    // Messages de confirmation du mail
    $message_envoye = "Merci, votre message nous est bien parvenu !";
    $message_non_envoye = "L'envoi du mail a échoué, veuillez réessayer SVP.";

    // Message d'erreur du formulaire
    $message_formulaire_invalide = "Vérifiez que tous les champs soient bien remplis et que l'email soit sans erreur.";

    /*
    	********************************************************************************************
    	FIN DE LA CONFIGURATION
    	********************************************************************************************
    */

    /*
     * cette fonction sert à nettoyer et enregistrer un texte
     */
    function Rec($text)
    {
    	$text = htmlspecialchars(trim($text), ENT_QUOTES);
    	if (1 === get_magic_quotes_gpc())
    	{
    		$text = stripslashes($text);
    	}

    	$text = nl2br($text);
    	return $text;
    };

    /*
     * Cette fonction sert à vérifier la syntaxe d'un email
     */
    function IsEmail($email)
    {
    	$value = preg_match('/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!\.)){0,61}[a-zA-Z0-9_-]?\.)+[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!$)){0,61}[a-zA-Z0-9_]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/', $email);
    	return (($value === 0) || ($value === false)) ? false : true;
    }

    // formulaire envoyé, on récupère tous les champs.
       	$nom     = (isset($_POST['nom']))     ? Rec($_POST['nom'])     : '';
    	$email   = (isset($_POST['email_form']))   ? Rec($_POST['email_form'])   : '';
    	$objet   = (isset($_POST['entreprise']))   ? Rec($_POST['entreprise'])   : '';
    	$message = (isset($_POST['message_form'])) ? Rec($_POST['message_form']) : '';

    // On va vérifier les variables et l'email ...
    $email = (IsEmail($email)) ? $email : ''; // soit l'email est vide si erroné, soit il vaut l'email entré
    $err_formulaire = false; // sert pour remplir le formulaire en cas d'erreur si besoin

    if (isset($_POST['envoi']))
    {
    	if (($nom != '') && ($email != '') && ($objet != '') && ($message != ''))
    	{
    		// les 4 variables sont remplies, on génère puis envoie le mail
    		$headers  = 'From:'.$nom.' <'.$email.'>' . "\r\n";
    		//$headers .= 'Reply-To: '.$email. "\r\n" ;
    		//$headers .= 'X-Mailer:PHP/'.phpversion();

    		// envoyer une copie au visiteur ?
    		if ($copie == 'oui')
    		{
    			$cible = $destinataire.';'.$email;
    		}
    		else
    		{
    			$cible = $destinataire;
    		};

    		// Remplacement de certains caractères spéciaux
    		$message = str_replace("&#039;","'",$message);
    		$message = str_replace("&#8217;","'",$message);
    		$message = str_replace("&quot;",'"',$message);
    		$message = str_replace('&lt;br&gt;','',$message);
    		$message = str_replace('&lt;br /&gt;','',$message);
    		$message = str_replace("&lt;","&lt;",$message);
    		$message = str_replace("&gt;","&gt;",$message);
    		$message = str_replace("&amp;","&",$message);

    		// Envoi du mail
    		$num_emails = 0;
    		$tmp = explode(';', $cible);
    		foreach($tmp as $email_destinataire)
    		{
    			if (mail($email_destinataire, $objet, $message, $headers))
    				$num_emails++;
    		}

    		if ((($copie == 'oui') && ($num_emails == 2)) || (($copie == 'non') && ($num_emails == 1)))
    		{
    			echo '<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'.$message_envoye.'</div>';
                $err_formulaire = true;
                    		}
    		else
    		{
    			echo '<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'.$message_non_envoye.'</div>';
                $err_formulaire = true;
                     		};
    	}
    	else
    	{
    		// une des 3 variables (ou plus) est vide ...
    		echo '<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'.$message_formulaire_invalide.'</div>';
    		$err_formulaire = true;

    	};
    }; // fin du if (!isset($_POST['envoi']))

    if (($err_formulaire) || (!isset($_POST['envoi'])))
    {
    	// afficher le formulaire

echo '
<form  id="contact" method="post" action="'.$form_action.'" enctype="multipart/form-data">

                     <div class="form-group">
                      <label for="Nom" class="required">Nom et prénom</label>
                      <input type="name" class="form-control" id="nom" name="nom" value="'.stripslashes($nom).'" required></input>
                    </div>
                    <div class="form-group">
                     <label for="Entreprise" class="required">Entreprise</label>
                     <input type="company" class="form-control" id="entreprise" name="entreprise" value="'.stripslashes($objet).'" required></input>
                    </div>
                   <div class="form-group">
                     <label for="email" class="required">Email</label>
                     <input type="email" class="form-control" id="email_form" name="email_form" value="'.stripslashes($email).'" required></input>
                    </div>
                    <div class="form-group">
                     <label for="Message" class="required">Message</label>
                     <textarea type="name" class="form-control" id="message_form" name="message_form" required>'.stripslashes($message).'</textarea>
                   </div>
                    <button type="submit" name="envoi" class="btn btn-bleu-i" title="Envoyer">Envoyer</button>
                    </form>

';


    };
    ?>

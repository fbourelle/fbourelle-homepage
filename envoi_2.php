
<?php
$nom = $_POST['nom']; 
$prenom = $_POST['prenom'];
$entreprise = $_POST['entreprise'];
$email = $_POST['email_form'];


$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'To: frederic.bourelle@gmail.com' . "\r\n";
$headers .= 'From: $email'. "\r\n";
$headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$headers .= 'Content-Transfer-Encoding: 8bit' . "\r\n";
$subject .= "Formulaire de contact";
$message .= $_POST['message_form'];
while (list($key, $val) = each($HTTP_POST_VARS)) {if(!empty($val)) {$message .= "$key : $val\n";}}
mail($TO, $subject, $message, $headers);
Header("Location: http://www.frederic-bourelle.fr");
?>

  <?php
  
  
	$headers .= 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$headers .= 'Content-Transfer-Encoding: 8bit' . "\r\n";
$headers .= 'To: frederic.bourelle@gmail.com' . "\r\n";
$message .= $this->input->$_POST['message_form'];
$from_email="=?UTF-8?B?".base64_encode( $this->input->$_POST['email_form'])."?=";
$from_user = "=?UTF-8?B?".base64_encode( $this->input->$_POST['nom'])."?=";
$subject .= "=?UTF-8?B?".base64_encode($this->input->$_POST['prenom'])."?=";
$headers .= "From: $from_user <$from_email>\r\n".   "MIME-Version: 1.0" . "\r\n" .
                 "Content-type: text/html; charset=UTF-8" . "\r\n";
 while (list($key, $val) = each($HTTP_POST_VARS)) {if(!empty($val)) {$message .= "$key : $val\n";}}
mail($to, $subject, $message, $headers);
Header("Location: http://www.frederic-bourelle.fr");

 
?>
  <?php
  
  $destinataire = $_POST['email'];
  // Pour les champs $expediteur / $copie / $destinataire, séparer par une virgule s'il y a plusieurs adresses
  $expediteur = 'tonmail@domain.com';
  $objet = $_POST['subject'];
  $headers  = 'MIME-Version: 1.0' . "\n"; // Version MIME
  $headers .= 'Content-type: text/html; charset=ISO-8859-1'."\n"; // l'en-tete Content-type pour le format HTML
  $headers .= 'Reply-To: '.$expediteur."\n"; // Mail de reponse
  $headers .= 'From: "Nom_de_expediteur"<'.$expediteur.'>'."\n"; // Expediteur
  $headers .= 'Delivered-to: '.$destinataire."\n"; // Destinataire    
  $message = '<div style="width: 100%; text-align: center; font-weight: bold"> Bonjour'.$_POST['name'].'! \n'.$_POST['message'].'</div>';
 
       
                 if(mail($to, $subject, $message, $headers))
                  {
                    ?>
 
                      <script languag="javascript" >alert("Votre message a bien été envoyé ");</script>
 
                      <?php
                  }
                  else // Non envoyé
                  {
                    ?>
                      <script languag="javascript">alert("Votre message n'a pas pu être envoyé");</script>
 
 
                       <?php
                 }
                header('Location: monformulaire.php');
 
?>
<?php
$FileName="media/musics/" . basename($_FILES['FileInput']['name']);
move_uploaded_file($_FILES['FileInput']['tmp_name'],$FileName);
echo("siker");
header("Location: https://github.com/Smc05/musicapp");
exit();

?>

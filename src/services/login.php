<?php
    include("../models/classMedicos.php");
    session_start();

    try {
        if(isset($_POST['btn-login'])){
            $medico = new Medicos();
            $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
            $senha = filter_var($_POST['senha'], FILTER_SANITIZE_STRING);
            $cripto = md5($senha);
            $medico->setEmail($email);
            $medico->setSenha($cripto);
            $consulta = $medico->login();

            if ($consulta){
                $_SESSION['medico'] = true;
                header("Location: ../views/menu.php");
            }else{
                $_SESSION['nao_autenticado'] = true;
                header("Location: ../../index.php");
                exit();
            }
        }
    }catch(PDOException $e) {
      echo 'Error: ' . $e->getMessage();
    }
?>
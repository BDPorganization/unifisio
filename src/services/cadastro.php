<?php
    include("../models/classMedicos.php");
    session_start();

    try {
        if(isset($_POST['btn-cadastro'])){
            $medico = new Medicos();
            $especialidade = filter_var($_POST['especialidade'], FILTER_SANITIZE_STRING);
            $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
            $nome = filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
            $senha = filter_var($_POST['senha'], FILTER_SANITIZE_STRING);
            $senhaConf = filter_var($_POST['confirma'], FILTER_SANITIZE_STRING);
            $cripto = md5($senha);

            if ($senha == $senhaConf) {
                $medico->setEspecialidade($especialidade);
                $medico->setEmail($email);
                $medico->setNome($nome);
                $medico->setSenha($cripto);
                $cadastro = $medico->cadastro();
    
                if ($cadastro){
                    $_SESSION['cadastrado'] = true;
                    header("Location: ../views/index.php");
                }else{
                    $_SESSION['nao_cadastrado'] = true;
                    header("Location: ../../index.php");
                    exit();
                }
            }else {
                $_SESSION['senhas_diferentes'] = true;
                header("Location: ../../index.php");
                exit();
            }
        }
    }catch(PDOException $e) {
      echo 'Error: ' . $e->getMessage();
    }
?>
<?php

    require_once 'classConexao.php';

    class Medicos {
        protected $table = 'medicos';
        protected $id = 'pk_medicos';
        protected $buscar = 'nome';

        private $especialidade;
        private $email;
        private $nome;
        private $senha;

        public function setEspecialidade($especialidade){
            $this->especialidade = $especialidade;
        }
        public function getEspecialidade(){
            return $this->especialidade;
        }
        public function setEmail($email){
            $this->email = $email;
        }
        public function getEmail(){
            return $this->email;
        }
        public function setNome($nome){
            $this->nome = $nome;
        }
        public function getNome(){
            return $this->nome;
        }
        public function setSenha($senha){
            $this->senha = $senha;
        }
        public function getSenha(){
            return $this->senha;
        }

        public function login() {
            $sql = "SELECT * FROM medicos WHERE email = :email and senha = :senha";
            $stmt = Database::prepare($sql);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":senha", $this->senha);
            $stmt->execute();

            return $stmt->fetch();
        }
    }
?>
<?php 
	session_start();
	if (isset($_SESSION['aluno']) || isset($_SESSION['bibliotecario'])) {
		session_destroy();
	}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include '../components/header.php'; ?>
        <title>LOGIN | ENTRAR</title>
    </head>
    <body>
        <div class="tela">
            <div class="nav-login">
                <div class="nav-link-item"><a href="/index.php"><i class="fa fa-arrow-left-long"></i>Página Inicial</a></div>
                <div class="page-info-name"><p>Você está na página:</p><a href="#">login</a></div>
            </div>
            
            <div class="login-div">
                <div class="form-login">
                    <div><img class="logo" src="/public/static/imagens/athenas.png"></div>
                    <form method="POST" action="../services/login.php">
                        <?php if(isset($_SESSION['nao_autenticado'])): ?>
                        <div><p class="text-center text-danger">Dados incorretos. Tente novamente!</p></div>
                        <?php unset($_SESSION["nao_autenticado"]); endif; ?>
                        
                        <div><input type="email" placeholder="E-MAIL" name="email" required></div>
                        <div><input type="password" placeholder="SENHA" name="senha" required> </div>
                        <div class="wrap"><button name="btn-login" class="btn-login button">ACESSAR</button></div>
                    </form>
                </div>
            </div>
        </div>

        <?php include '../components/footer.php'; ?>
        <?php include '../components/scriptsBody.php'; ?>
    </body>
</html>
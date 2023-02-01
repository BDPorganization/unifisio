<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/public/img/logoSimples_png.png" type="image/x-icon"/>
    <!-- Nunito -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet"> 
    <!-- Boostrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <!-- Css externo -->
    <link rel="stylesheet" href="../public/css/style.css">
    <title>Home - Unifisio</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-white">
        <div class="navbar-brand div-nav">
            <img src="../public/img/logoSimples_png.png" alt="LOGO_UNIFISIO">
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#barraNavegacao" aria-expanded="false" >
            <i class="fa-solid fa-bars-staggered"></i>
        </button>
        <div class="collapse navbar-collapse" id="barraNavegacao">
            <ul class="navbar-nav mb-2 mb-lg-0">
            <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Salas
                    </a>
                    <div class="dropdown-menu p-2" aria-labelledby="navbarDropdown">
                        <div>
                            <a class="dropdown-item" href="#">
                                <img src="./public/img/sala3/1.jpg"  width="100px" alt="consultório 1">
                                <p>Consultório 1</p>
                                <p style="font-size: 12px; width: 30%;">
                                    Ideal para você que busca otimização <br> de pequenos espaços e salas aconchegantes.
                                </p>
                            </a>
                        </div>
                        <div>
                            <a class="dropdown-item" href="#">
                                <img src="./public/img/sala2/1.jpg"  width="100px" alt="consultório 1">
                                <p>Consultório 2</p>
                                <p style="font-size: 12px; width: 30%;">
                                    Conte com mais espaço e área de circulação,<br> ideal para fazer medições e pesagens.
                                </p>
                            </a>
                        </div>
                        <div>
                            <a class="dropdown-item"href="#">
                                <img src="./public/img/sala1/imagem1.jpg"  width="100px" alt="consultório 1">
                                <p>Studio de Pilates</p>
                                <p style="font-size: 12px; width: 30%;">
                                    Encontre um studio com ótimos equipamentos <br> para usar com até três pacientes simultâneos
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
                <li class="nav-item">
                    <a class="nav-link" href="">Especialidades</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">Contato</a>
                </li>
            </ul>
        </div>
        <a class="btn-login btn" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">
            <i class="fa fa-user"></i> Login
        </a>
    </nav>

    <section>

        <div class="div-inicial">
            <h1>Experimente o Coworking dos seus sonhos!</h1>
            <div>
                <i class="fa-solid fa-graduation-cap"></i>
                <p>Ideal para você que acabou de se formar na área da saúde</p>
            </div>
            <div>
                <i class="fa-solid fa-hand-holding-dollar"></i>
                <p>Você economiza dinheiro em relação ao aluguel mensal</p>
            </div>
            <div>
                <i class="fa-solid fa-stethoscope"></i>
                <p>Fique livre da preocupação de equipar um consultório</p>
            </div>
        </div>
        
        <div class="div-coworking">
            <div>
                <div class="text-coworking">
                    <h3 class="mb-3">O que é Coworking?</h3>
                    <p>Coworking consiste no aluguel de salas feito a partir da sua necessidade. Assim, é possível alugar salas organizadas, limpas e equipadas por algumas horas e principalmente, por um valor que cabe no seu bolso.</p>
                    <button type="button" class="btn btn-warning">Saber mais <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        
        <div class="div-informacoes-empresa">
            <div>
                <div class="div-informacoes">
                    <h1>Por que escolher a Unifísio?</h1>
                    <h5>A Unifísio possui credibilidade e bastante tempo neste mercado. As salas são bem equipadas e localizadas, estando em ambientes seguros e de fácil acesso. Além disso, todas as reservas são asseguradas por contratos e documentos oficiais.</h5>
                    <button type="button" class="btn btn-warning btn-lg">Saber mais <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>

        <div class="div-descontos">
            <div>
                <h1 style="text-shadow: rgb(255, 255, 255) 0.1em 0.01em 0em;">Descontos e Benefícios</h1>
                <h5>Na Unifísio você encontra descontos para te auxiliar a ingressar no mercado de trabalho com o máximo de flexibilidade em valores e horários, possibilitando que você e seus pacientes tenham todo o processo de atendimento personalizado</h5>
            </div>
            <div class="card-descontos">
                <div>
                    <h2>8% de Desconto</h2>
                    <h5>Ao indicar um amigo.</h5>
                    <i class="fa-regular fa-handshake"></i>
                </div>
                <div style="height: 100%;">
                    <h2>12% de Desconto</h2>
                    <h5>Ao alugar 20hrs ou mais.</h5>
                    <i class="fa-regular fa-clock"></i>
                </div>
                <div>
                    <h2>5% de Desconto</h2>
                    <h5>Ao seguir as redes sociais da Unifísio.</h5>
                    <i class="fa-regular fa-heart"></i>
                </div>
            </div>
        </div>

        <div class="div-localizacao">
            <h1 class="h1">Localização - Unifísio</h1>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.5001640255646!2d-40.29536494919331!3d-20.279554286342226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb8199e4c8c17db%3A0xee5b59535434cd97!2sUnifisio%20Sa%C3%BAde%20%26%20Bem%20Estar!5e0!3m2!1spt-BR!2sbr!4v1671653564524!5m2!1spt-BR!2sbr" width="600" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            <div>
                <h1>Estamos em Vitória.</h1>
                <div>
                    
                    <p><i class="fa-solid fa-store"></i> Shopping Victoria Mall - Mata da Praia.</p>
                    <p><i class="fa-solid fa-car"></i> Estacionamento gratuito para você e seus pacientes.</p>
                    <p><i class="fa-solid fa-person-walking"></i> Local movimentado e com seguranças 24hrs.</p>
                    <p><i class="fa-solid fa-trash-arrow-up"></i>O prédio possui descarte de lixo hospitalar.</p>
                    <p><i class="fa-solid fa-user-doctor"></i> Fique próximo de outros consultórios e profissionais.</p>
                </div>
            </div>
        </div>
        
    </section>

        <!-- Modal -->
        <div class="modal fade modal-lg" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content">
                    <div class="modal-body" style="display: flex; justify-content: space-around; padding: 0%; height: 400px; width: 100%;">
                        <div style="width: 50%; padding: 15px;">
                            <form method="POST" action="/src/services/login.php">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email: </label>
                                    <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com">
                                </div>
                                <div class="mb-3">
                                    <label for="senha" class="form-label">Senha: </label>
                                    <input type="password" class="form-control" id="senha" name="senha">
                                </div>
                                <button type="submit" class="btn btn-light w-100 mt-2" name="btn-login">Entrar</button>
                            </form>
                            <a href="" data-bs-toggle="modal" data-bs-target="#cadastro" class="btn btn-primary w-100 mt-3">Cadastrar-me</a>

                            <button type="button" class="btn btn-danger w-100 mt-3"><i style="padding-right: 30px" class="fa-brands fa-google"></i>Acesse com Google</button>
                        </div>
                        <div style="width: 50%; height: 100%;">
                            <img style="width: 100%;height: 100%;" src="../public/img/sala3/1.jpg" alt="IMAGEM-SALA">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade modal-lg" id="cadastro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Faça seu cadastro</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nome" class="form-label">Nome completo: </label>
                            <input type="email" class="form-control" id="nome" name="nome">
                        </div>
                        <div class="mb-3">
                            <label for="especialidade" class="form-label">Especialidade: </label>
                            <input type="email" class="form-control" id="especialidade" name="especialidade">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail: </label>
                            <input type="email" class="form-control" id="email" name="email">
                        </div>
                        <div class="d-flex w-100 mb-3">
                            <div style="width: 49%; margin-right: 2%;">
                                <label for="senha" class="form-label">Senha: </label>
                                <input type="password" class="form-control" id="senha" name="senha">
                            </div>
                            <div style="width: 49%">
                                <label for="confirma" class="form-label">Confirme sua Senha: </label>
                                <input type="password" class="form-control" id="confirma" name="confirma">
                            </div>
                        </div>
                        <div class="d-flex w-100 justify-content-end">
                            <button type="button" class="btn btn-primary">Confirmar</button>
                            <button type="button" class="btn btn-secondary ms-2" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    <?php include '/src/components/footer.php'; ?>

    <!-- Script FontAwesome -->
    <script src="https://kit.fontawesome.com/a9ac96b7ba.js" crossorigin="anonymous"></script>
    <!-- Script Boostrap-->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK" crossorigin="anonymous"></script>
</body>
</html>
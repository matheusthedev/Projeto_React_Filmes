import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2'

// Inportação de componentes:
import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista";


const CadastroGenero = () => {

    // nome do genero
    const [genero, setGenero] = useState("");
    function alerta(icone, mensagem){
        const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: icone,
  title: mensagem
});
    }
    async function cadastrarGenero(e) {
        e.preventDefault();
        if (genero.trim() != "") {

            // try => tentar
            // catch => lança a exceção
            try {
                // cadastrar um genero: post
                await api.post("genero", { nome: genero });
                alerta("success", "Cadastro realizado com sucesso!")
                setGenero("")
            } catch (error) {
                alerta("error", "Erro! entre em contato com o suporte")
            }
        } else {
            alerta("error", "Preencha o campo vazio")
        }
    }

    // teste: validar o genero
    // useEffect(() => {
    //     console.log(genero);
    // },[genero])
    // Fim do teste

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="Gênero"
                    // Atribuindo a função:
                    funcCadastro={cadastrarGenero}
                    // Atribuindo o valor ao input
                    valorInput={genero}
                    //Atribuindo a função que atualiza o meu genero
                    setValorInput={setGenero}
                />
                <Lista
                    titulo="Lista dos Gêneros"
                    visible="none"
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;
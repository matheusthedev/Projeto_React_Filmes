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
    const [listaGenero, setListaGenero] = useState([])
    const [deletaGenero, setDeletaGenero] = useState();

    function alertar(icone, mensagem) {
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
                alertar("success", "Cadastro realizado com sucesso!")
                setGenero("")
            } catch (error) {
                alertar("error", "Erro! entre em contato com o suporte")
            }
        } else {
            alertar("error", "Preencha o campo vazio")
        }
    }
    //sincrono => Acontece simultaneamente
    //assincrono => Espera algo/resposta para ir em outro bloco do codigo
    async function listarGenero() {
        try {
            //await => Aguarda uma resp da solicitação
            const resposta = await api.get("genero");

            // console.log(resposta);

            setListaGenero(resposta.data);
            console.log(resposta.data);

        } catch (error) {
            console.log(error);
        }
    }

    //Funcao excluir genero
    async function removerGenero(idGenero, warning) {
        try {
            const excluirGenero = await api.delete(`genero/${idGenero}`)
            setDeletaGenero(excluirGenero.data)

            Swal.fire({
                title: "Você tem certeza que quer excluir?",
                text: "Você não vai poder reverter isso!",
                icon: warning,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deletado!",
                        text: "Deletado com sucesso!",
                        icon: "success"
                    });
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    }


        async function editarGenero(genero){
        const { value: novoGenero } = await Swal.fire({
            title: "Modifique seu gênero",
            input: "text",
            inputLabel: "Novo gênero",
            inputValue: genero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });

        if (novoGenero) {
            try {
                api.put(`genero/${genero.idGenero}`, {nome: novoGenero})
                Swal.fire(`O gênero modificado ${novoGenero}`);
                listaGenero();
            } catch (error) {
                
            }
        }
    }

    // teste: validar o genero
    // useEffect(() => {
    //     console.log(genero);
    // },[genero])
    // Fim do teste

    // Teste: validar o que esta sendo passado como resposta em listaGenero
    useEffect(() => {
        listarGenero();
    }, [listaGenero])

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

                    //atribuir para lista, o meu estado atual:
                    lista={listaGenero}

                    deletar={removerGenero}
                    funcEditar={editarGenero}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;

import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista";


const CadastroGenero = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="Gênero"
                />
                <Lista
                titulo = "Lista dos Gêneros"
                visible = "none"
                 />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;
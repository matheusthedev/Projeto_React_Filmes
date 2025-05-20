import "./Cadastro.css";
import Botao from "../botao/Botao"

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form onSubmit={props.funcCadastro} className="layout_grid form_cadastro">
                <h1>{props.tituloCadastro}</h1>
                <hr />
                <div className="campos_cadastro">
                    <div className="campo_cad_nome">
                        <label htmlFor="nome" >Nome</label>
                        <input
                            type="text"
                            name="nome"
                            placeholder={`Digite o nome do ${props.placeholder}`}
                            value={props.valorInput}
                            // Ao mudar o input algo acontece
                            //  Atualizar o estado do pai ao digitar
                            onChange={(e) => props.setValorInput(e.target.value)}
                        />
                    </div>
                    <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
                        <label htmlFor="genro">Gênero</label>
                        <select name="genero" id=""
                            value={props.valorSelect}
                            onChange={(e) => props.setValorSelect(e.target.value)}
                        >
                            <option value="" disabled>Selecione</option>
                            {props.lista && props.lista.length > 0 && props.lista.map((itemGenero) =>
                                <option value={itemGenero.idGenero}>{itemGenero.nome}</option>
                            )}
                        </select>
                    </div>
                    <Botao nomeDoBotao="Cadastrar" />
                </div>
            </form>
        </section>
    )
}

export default Cadastro;
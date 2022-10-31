import React, { useState, useEffect } from 'react';
import axios from "axios"
import { BASE_URL } from "../../Constants"
import Modal from 'react-modal'
import { Span, Wrapper, Input, Button, Btn, BtnX, Small, FormStyled, DivInput, DivSelect, H1, H3, Legend } from "./styled"
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated'




export const HomePage = () => {
    
    const [ufs, setUfs] = useState([])
    const [cities, setCities] = useState([])
    const [options, setOptions] = useState([""]);
    const [options2, setOptions2] = useState([""]);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const animatedComponents = makeAnimated()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const addPost = data => {
        reset()
        toast("Seu destino de interesse foi enviado com sucesso! ")
    }

    useEffect(() => {
        const getData = async () => {
            const arr = [];
            await axios.get(`${BASE_URL}/country`).then((res) => {
                let result = res.data
                result.map((user) => {
                    return arr.push({ value: user.name, label: user.name });
                });
                setOptions(arr)
            });
        };
        getData();

    }, []);

    useEffect(() => {
        const getData = async () => {
            const arr2 = [];
            await axios.get(`${BASE_URL}/city`).then((res) => {
                let result = res.data
                result.map((user) => {
                    return arr2.push({ value: user.name, label: user.name });
                });
                setOptions2(arr2)
            });
        };
        getData();

    }, []);


    useEffect(() => {
        axios.get(`${BASE_URL}/country`)
            .then((res) => {
                setUfs(res.data)

            })
    }, [])


    useEffect(() => {
        axios.get(`${BASE_URL}/city`)
            .then((res) => {
                setCities(res.data)
            })
    }, [])

    return (
        
        <div>
            <Wrapper>
            <H1>SEJA BEM VINDO AO <Span>NOSSA</Span>_<H3>VIAGEM!</H3></H1><br></br>
            <h2>Você pode marcar os seus destinos de interesse clicando abaixo</h2>
            <Button onClick={() => setModalIsOpen(true)}>Clique aqui</Button>
            </Wrapper>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>

                <FormStyled onSubmit={handleSubmit(addPost)}>

                    <DivInput>
                        <Legend>Dados Pessoais</Legend>
                        <Input
                            type="text"
                            placeholder="Nome"
                            name="nome"
                            {...register("nome", { required: "NNN" })}>
                        </Input>
                        {errors.nome && (<Small>Por favor, insira um nome</Small>)}
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            {...register("email", { required: "NNN" })}>
                        </Input>
                        {errors.email && (<Small>Por favor, insira um email</Small>)}
                        <Input
                            type="text"
                            placeholder="Telefone"
                            name="telefone"
                            {...register("telefone", { required: "NNN" })}></Input>
                        {errors.telefone && (<Small>Por favor, insira um telefone</Small>)}
                        <Input
                            type="text"
                            placeholder="CPF"
                            name="cpf"
                            {...register("cpf", { required: "NNN" })}>
                        </Input>
                        {errors.cpf && (<Small>Por favor, insira um cpf</Small>)}
                    </DivInput>

                    <DivSelect>
                        <Legend>Destinos de Interesse</Legend>
                        <CreatableSelect
                            components={animatedComponents}
                            placeholder="Select an individual"
                            options={options}
                            isMulti
                            noOptionsMessage={() => "name not found"}
                            isLoading={true}
                        ></CreatableSelect>
                        <CreatableSelect
                            components={animatedComponents}
                            placeholder="Select an individual"
                            options={options2}
                            isMulti
                            noOptionsMessage={() => "name not found"}
                            isLoading={true}
                        ></CreatableSelect>
                    </DivSelect>
                    <BtnX onClick={() => setModalIsOpen(false)}>Fechar</BtnX>
                    <Btn type='submit'>Enviar</Btn>
                    <ToastContainer />
                </FormStyled>
            </Modal>
        </div>
    )
}
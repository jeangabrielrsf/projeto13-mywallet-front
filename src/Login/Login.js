import { useContext, useState } from "react";
import Logo from "../GlobalStyles/Logo";
import axios from "axios";
import styled from "styled-components";
import Form from "../GlobalStyles/Form";
import EndFormButton from "../GlobalStyles/EndFormButton";
import { Link, useNavigate } from "react-router-dom";
import UserTokenContext from "../contexts/UserTokenContext";

export default function Login() {
	const loginURL = "http://localhost:5000/login";
	const { setUserToken } = useContext(UserTokenContext);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [textButton, setTextButton] = useState("Entrar");
	const navigate = useNavigate();

	function handleForm(e) {
		e.preventDefault();
		axios
			.post(loginURL, formData)
			.then((result) => {
				console.log("Requisição OK!");
				console.log(result);
				navigate("/atividades");
			})
			.catch((error) => {
				alert(error.response.data.message);
			});
	}

	function handleDataForm(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	return (
		<>
			<Logo />
			<Form onSubmit={handleForm}>
				<input
					type="email"
					placeholder="E-mail"
					name="email"
					onChange={handleDataForm}
					required
				/>

				<input
					type="password"
					placeholder="Senha"
					name="password"
					onChange={handleDataForm}
					required
				/>

				<button type="submit">
					<Button>{textButton}</Button>
				</button>
			</Form>

			<EndFormButton>
				<Link to="/cadastro">
					<p>Primeira vez? Cadastra-se!</p>
				</Link>
			</EndFormButton>
		</>
	);
}

const Button = styled.div`
	width: auto;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
`;

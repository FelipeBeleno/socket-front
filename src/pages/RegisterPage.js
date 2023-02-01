import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import { AuthContext } from '../auth/AuthContext';

export const RegisterPage = () => {



    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
    })


    const { register } = useContext(AuthContext)


    function handleChange({ target }) {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }


    function todoOk() {

        return (form.email.length > 0 && form.name.length > 0 && form.password.length > 0)
    }


    async function handleSubmit(e) {
        e.preventDefault();

        const response = await register(
            form.name,
            form.email,
            form.password,
        )



        if (!response) {
            Swal.fire('Error', 'Verifique los datos', 'error')
        }

    }

    return (
        <form

            onSubmit={handleSubmit}
            className="login100-form validate-form flex-sb flex-w">
            <span className="login100-form-title mb-3">
                Chat - Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input className="input100" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nombre" />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input className="input100" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input className="input100" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div className="col text-right">
                    <Link to="/auth/login" className="txt1">
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button

                    type='submit'
                    disabled={!todoOk()}
                    className="login100-form-btn">
                    Crear cuenta
                </button>
            </div>

        </form>
    )
}

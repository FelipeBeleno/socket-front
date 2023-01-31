import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export const LoginPage = () => {


    const [form, setForm] = useState({
        email: localStorage.getItem('email') || '',
        password: '',
        rememberme: false
    })

    const { login } = useContext(AuthContext)

    function onChange({ target }) {

        const { name, value } = target;

        setForm({
            ...form,
            [name]: value
        })
    }
    function toggleCheck() {

        setForm({
            ...form,
            rememberme: !form.rememberme
        })

    }


    function onSubmit(e) {
        e.preventDefault();

        if (form.rememberme) {
            localStorage.setItem('email', form.email)
        } else {
            localStorage.removeItem('email')
        }

        const { email, password } = form;
        // TODO llamar backend
        login(email, password)

    }

    return (
        <form
            onSubmit={onSubmit}
            className="login100-form validate-form flex-sb flex-w">
            <span className="login100-form-title mb-3">
                Chat - Ingreso
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input className="input100" type="email" onChange={(e) => onChange(e)} value={form.email} name="email" placeholder="Email" />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input className="input100" type="password" onChange={(e) => onChange(e)} value={form.password} name="password" placeholder="Password" />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div className="col"

                    onClick={() => toggleCheck()}
                >


                    <input
                        className="input-checkbox100"
                        readOnly
                        checked={form.rememberme}
                        id="ckb1"
                        type="checkbox"
                        name="rememberme" />
                    <label className="label-checkbox100">
                        Recordarme
                    </label>
                </div>

                <div className="col text-right">
                    <Link to="/auth/register" className="txt1">
                        Nueva cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button className="login100-form-btn">
                    Ingresar
                </button>
            </div>

        </form>
    )
}

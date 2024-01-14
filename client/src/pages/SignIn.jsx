import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoginMutation } from '../app/apiUser';

import Form from '../components/Form';

export function Component(){
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const signInHandler = useCallback(async (data) => {
    setError("");

    try {
      const res = await login(data).unwrap();
      const { setUser } = await import("../app/appSlice");
      
      dispatch(setUser({...res}));
    }catch(err){
      console.log('SignIn_signInHandler_', err);
      setError("Nieprawidłowy adres email lub hasło");
    }
  }, []);

  return (
    <section className="form__wrapper">
      <Form submitHandler={signInHandler} error={error} title="Logowanie" buttonTitle="Zaloguj się" requirePassword />
      <p className="form__message">
        Nie masz jeszcze konta? <Link to="/auth/signup">Załóż nowe konto</Link>
      </p>
    </section>
  )
}

Component.displayName = "SignIn";
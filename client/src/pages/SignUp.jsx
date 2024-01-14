import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useSignupMutation } from '../app/apiUser';

import Form from '../components/Form';

export function Component(){
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [signUp] = useSignupMutation();

  const signUpHandler = useCallback(async (data) => {
    setError("");

    try {
      const res = await signUp(data).unwrap();
      const { setUser } = await import("../app/appSlice");

      dispatch(setUser({...res}));
    }catch(err){
      setError("Nieprawidłowy dane");
    }
  }, []);

  return (
    <section className="form__wrapper">
      <Form submitHandler={signUpHandler} error={error} title="Rejestracja" buttonTitle="Utwórz konto" withUsername requirePassword />
      <p className="form__message">
        Posiadasz już konto? <Link to="/auth">Przejdź do logowania</Link>
      </p>
    </section>
  )
}

Component.displayName = "SignUp";
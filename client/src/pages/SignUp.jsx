import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useSignupMutation } from '../app/apiUser';

import Form from '../components/Form';

export function Component(){
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [signUp, { isLoading }] = useSignupMutation();

  const signUpHandler = useCallback(async (data) => {
    setError("");

    try {
      const res = await signUp(data).unwrap();
      const { setUser } = await import("../app/appSlice");

      dispatch(setUser({...res}));
    }catch(err){
      const errorMessage = err?.data?.message || "Nieprawidłowe dane";
      setError(errorMessage);
    }
  }, []);

  return (
    <section className="form__wrapper">
      <Form submitHandler={signUpHandler} isLoading={isLoading} error={error} title="Rejestracja" buttonTitle="Utwórz konto" withUsername requirePassword />
      <p className="form__message">
        Posiadasz już konto? <Link to="/auth">Przejdź do logowania</Link>
      </p>
    </section>
  )
}

Component.displayName = "SignUp";
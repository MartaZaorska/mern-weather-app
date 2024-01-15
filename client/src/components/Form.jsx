import { useState, memo } from 'react';
import { validateUserData } from '../utils';

function Form({ 
  isLoading, 
  title, 
  buttonTitle, 
  submitHandler, 
  error, 
  data = null, 
  requirePassword = false, 
  withUsername = false, 
  withUnit = false 
}) {
  const [validationMessage, setValidationMessage] = useState(null);

  const preSubmitHandler = (e) => {
    e.preventDefault();

    const data = {};

    const { email, password, username = null, unit = null } = e.target.elements;

    data.email = email?.value || "";
    if(requirePassword || password?.value.length > 0) data.password = password?.value || "";
    if(withUsername) data.username = username?.value || "";
    if(withUnit) data.unit = unit?.value;    

    const validation = validateUserData(data.email, data?.password, data?.username);

    if(Object.keys(validation).length === 0){
      setValidationMessage(null);
      e.target.reset();
      submitHandler(data);
    }else{
      setValidationMessage(validation);
    }
  }

  return (
    <>
      <header className="form__header">
        <h3>{title}</h3>
      </header>
      <form onSubmit={preSubmitHandler}>
        {withUsername && (
          <div className="input__control">
            <label htmlFor="username">Nazwa użytkownika: </label>
            <input disabled={isLoading} type="text" placeholder="Twoja nazwa..." id="username" name="username" defaultValue={data?.username || ""} />
            {validationMessage?.username && <p className='message'>{validationMessage.username}</p>}
          </div>
        )}
        <div className="input__control">
          <label htmlFor="email">E-mail: </label>
          <input disabled={isLoading} type="text" placeholder="Twój adres email..." id="email" name="email" defaultValue={data?.email || ""} />
          {validationMessage?.email && <p className='message'>{validationMessage.email}</p>}
        </div>
        <div className="input__control">
          <label htmlFor="password">Hasło: </label>
          <input disabled={isLoading} type="password" placeholder="Hasło..." id="password" name="password" />
          {validationMessage?.password && <p className='message'>{validationMessage.password}</p>}
        </div>
        {withUnit && (
          <div className="select__control">
            <label htmlFor="unit">Jednostka: </label>
            <select disabled={isLoading} id="unit" name="unit" defaultValue={data.unit}>
              <option value="metric">Metryczne</option>
              <option value="standard">Standardowe</option>
              <option value="imperial">Imperialne</option>
            </select>
          </div>
        )}
        {!validationMessage && error && <p className='message'>{error}</p>}
        <button disabled={isLoading} type="submit">{buttonTitle}</button>
      </form>
    </>
  )
}

export default memo(Form);
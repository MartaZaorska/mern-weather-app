import { useState, memo } from 'react';
import { validateUserData } from '../utils';

function Form({ title, buttonTitle, submitHandler, error, data = null, requirePassword = false, withUsername = false, withUnit = false }) {
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
            <input type="text" placeholder="Twoja nazwa..." id="username" name="username" defaultValue={data?.username || ""} />
            {validationMessage?.username && <p>{validationMessage.username}</p>}
          </div>
        )}
        <div className="input__control">
          <label htmlFor="email">E-mail: </label>
          <input type="text" placeholder="Twój adres email..." id="email" name="email" defaultValue={data?.email || ""} />
          {validationMessage?.email && <p>{validationMessage.email}</p>}
        </div>
        <div className="input__control">
          <label htmlFor="password">Hasło: </label>
          <input type="password" placeholder="Hasło..." id="password" name="password" />
          {validationMessage?.password && <p>{validationMessage.password}</p>}
        </div>
        {withUnit && (
          <div className="select__control">
            <label htmlFor="unit">Jednostka: </label>
            <select id="unit" name="unit" defaultValue={data.unit}>
              <option value="metric">Metryczne</option>
              <option value="standard">Standardowe</option>
              <option value="imperial">Imperialne</option>
            </select>
          </div>
        )}
        {!validationMessage && error && <p>{error}</p>}
        <button type="submit">{buttonTitle}</button>
      </form>
    </>
  )
}

export default memo(Form);
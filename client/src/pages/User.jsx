import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useUpdateProfileMutation, useDeleteProfileMutation } from '../app/apiUser';
import { useDeleteLocationMutation } from '../app/apiLocation';

import { RiDeleteBinLine } from "react-icons/ri";

import Form from '../components/Form';

export function Component(){
  const [error, setError] = useState("");
  const { user, saveLocations } = useSelector(state => state.app);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [deleteLocation] = useDeleteLocationMutation();
  const [deleteProfile] = useDeleteProfileMutation();

  const updateUserHandler = async (data) => {
    setError("");

    const body = {};

    if(data?.username && data.username !== user.username) body.username = data.username;
    if(data?.email && data.email !== user.email) body.email = data.email;
    if(data.unit !== user.unit) body.unit = data.unit;
    if(data?.password) body.password = data.password;

    try {
      const res = await updateProfile(body).unwrap();
      const { setUser } = await import("../app/appSlice");

      dispatch(setUser({ ...res }));
      navigate("/");
    }catch(err){
      const errorMessage = err?.data?.message || "Nieprawidłowe dane";
      setError(errorMessage);
    }
  }

  const deleteLocationHandler = async ({ _id, lat, lon }) => {
    try {
      await deleteLocation(_id).unwrap();
      const { deleteSaveLocation } = await import("../app/appSlice");
      dispatch(deleteSaveLocation(_id));
    }catch(err){
      window.alert(err);
    }
  }

  const deleteUserProfile = async () => {
    try {
      await deleteProfile().unwrap();
      const { logout } = await import("../app/appSlice");
      dispatch(logout());
    }catch(err){
      window.alert(err);
    }
  }

  return (
    <section className="user">
      <div className="form__wrapper">
        <Form isLoading={isLoading} submitHandler={updateUserHandler} withUsername withUnit data={user} error={error} title="Twoje konto" buttonTitle="Aktualizuj" />
        <button className="danger__button" onClick={deleteUserProfile}>Usuń konto</button>
      </div>
      {saveLocations.length > 0 && (
        <div className="user__location">
          <header className="user__header">
            <h3>Zapisane lokalizacje</h3>
          </header>
          <ul className="location__list">
            {saveLocations.map(item => (
              <li key={item._id}><span>{item.name}</span> <button onClick={() => deleteLocationHandler(item)}><RiDeleteBinLine className="icon" /> Usuń</button></li>
            ))}
          </ul>
        </div>
      )}
      <div className="units">
        <header className="units__header">
          <h3>Jednostki</h3>
        </header>
        <div className="units__content">
          <p><span>Metryczne</span>: temperatura w Celsjuszach, prędkość w metry/sekundę.</p>
          <p><span>Standardowe</span>: temperatura w Kelwinach, prędkość w metry/sekundę.</p>
          <p><span>Imperialne (brytyjski system miar)</span>: temperatura w Fahrenheitach, prędkość w mile/godzinę.</p>
        </div>
      </div>
    </section>
  )
}

Component.displayName = "User";
import React, { useRef, useState } from 'react';
import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import NavBar from './NavBar';
import Jogos from './Jogos';
import Noticias from './Noticias';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Configurações para utilizar o Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


// Configuração do Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDNfsgPNx5isT5zSzTZo_Elg2HRMjFMl3g",
  authDomain: "chat-furioso-backend.firebaseapp.com",
  projectId: "chat-furioso-backend",
  storageBucket: "chat-furioso-backend.firebasestorage.app",
  messagingSenderId: "969102511600",
  appId: "1:969102511600:web:1182f61ef92c265986a135",
  measurementId: "G-HNXE14WNH7"

})

const auth = firebase.auth();
const firestore = firebase.firestore();


//Função principal da aplicação de chat, onde se encontra escrito o código da sala de chat também
function App() {
  const [user] = useAuthState(auth);

  return (
      <div className='App'>
        <Router>
          <NavBar logOut={LogOut}/>
          <div className='container'>
            <Routes>
              <Route path="/" element={user ? <SalaDeChat/> : <Login/>}/>
              <Route path="/jogos" element={<Jogos/>} />
              <Route path='/noticias' element={<Noticias/>} />
            </Routes>
          </div>
        </Router>
      </div>
  );
}

function Login() {
  const loginComGmail = () => {
    const loginProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(loginProvider);
  }

  // Será utilizado como método padrão para login o Gmail.
  return(
    <button onClick={loginComGmail}>Entrar com Gmail</button>
  )
}

function LogOut() {
  return auth.currentUser && auth.signOut();
}

function SalaDeChat() {
  // Buscando as mensagens na base de dados
  const refMensagens = firestore.collection('messages');
  // Ordenando as mensagens pelo momento de criação e limitando a exibir um máximo de 25 mensagens
  const query = refMensagens.orderBy('createdAt').limit(25);

  // Sincronicidade em tempo real com as mensagens na base
  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const dummy = useRef();

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL} = auth.currentUser;

    await refMensagens.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');

    dummy.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <>
    <main>
      {messages && messages.map(msg => <Mensagem key={msg.id} message={msg} />)}

      <div ref={dummy}></div>
    </main>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
      <button type='submit'>.-.</button>
    </form>
    </>
  )

}

function Mensagem(props) {
  const {text, uid, photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}/>
      <p>{text}</p>
      </div>
      </>)
}

export default App;

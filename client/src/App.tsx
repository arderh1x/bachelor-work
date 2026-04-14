import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <Register />
    </div>
  );
}

export default App;


// import { useEffect, useState } from 'react'
// import api from './api/axios'
// import './App.css'

// function App() {
//   const [serverMessage, setServerMessage] = useState<string>('Завантаження...')
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     // Робимо запит до базового роуту сервера
//     api.get('/')
//       .then(response => {
//         setServerMessage(response.data)
//       })
//       .catch(err => {
//         console.error(err)
//         setError('Не вдалося з’єднатися з сервером')
//       })
//   }, [])

//   return (
//     <div className="App">
//       <h1>RedS7 Project</h1>
//       <div className="card">
//         <p>Статус сервера: <strong>{error || serverMessage}</strong></p>
//       </div>
//       <p className="read-the-docs">
//         Якщо ви бачите "RedS7 Server is running", значить Proxy налаштовано вірно.
//       </p>
//     </div>
//   )
// }

// export default App


import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from '../Icons/PlusIcon'
function App() {

  return (
    <div className="">

   <Button startIcon= {<PlusIcon/>} variant="primary" text="Hello World" size="lg" onClick={() => {alert("Hello, World")}}/>
   <Button startIcon= {<PlusIcon/>} variant="secondary" text="Hello World" size="md" onClick={() => {alert("Hello, World")}}/>
   <Button startIcon= {<PlusIcon/>} variant="default" text="Hello World" size="sm" onClick={() => {alert("Hello, World")}}/>
    </div>
  

  )
}

export default App

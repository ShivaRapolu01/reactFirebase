import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config';
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc} from 'firebase/firestore'
function App() {
  const [users,setUsers]=useState([]); 
  const usersCollectionRef=collection(db,"users");
  const [newName,setNewName]=useState("");
  const [newAge,setNewAge]=useState(0);
  const [newCollege,setNewCollege]=useState("");
  console.log("userCollectionRef :",usersCollectionRef);
 
  const createUser=async (e)=>{
    e.preventDefault();
     await addDoc(usersCollectionRef,{name:newName,College:newCollege,Age:Number(newAge)});
     //Age:Number(newAge) is also available
    window.location.reload(); 

  }

  const updateUser=async (id,Age)=>{
    const newFields={Age:Age+1};
    const userDoc=doc(db,"users",id); 
    await updateDoc(userDoc,newFields)
    window.location.reload(); 
  }
  const deleteUser=async (id)=>{
    const userDoc=doc(db,"users",id); 
    await deleteDoc(userDoc); 
    window.location.reload(); 

  }
  useEffect(()=>{
    const getUsers=async ()=>{
        const data=await getDocs(usersCollectionRef); 
        console.log(data); 
        setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})
        ));
    }
    getUsers();
  },[]);
 

  return (
  <div className='App'>
        <div className='create-details'>
        
        <input required placeholder='Name' 
         onChange={(e)=>{
           setNewName(e.target.value);
          }}
        ></input>
        <input required placeholder='College'
        onChange={(e)=>{
          setNewCollege(e.target.value);
         }}
        ></input>
        <input required type="number"  placeholder='Age' 
         onChange={(e)=>{
          setNewAge(e.target.value);
         }}
        ></input>
        <button type='Submit' onClick={(e)=>createUser(e)}>Create User</button>
      
        {/* Here onClick={createUser is directly passed instead of onClick={()=>{createUser()}}}  because createUser has no arguments to be passed.
        Otherwise one has to put a function inside this onClick if the function takes arguments*/}
    </div>
    
      <div className='docbody'>
            {users.map((user)=>{
            return ( <div className='doc' key={user.id}>
                <span><b>Name:</b> {user.name}</span>
                <span><b>College:</b> {user.College}</span>
                <span><b>Age:</b> {user.Age}</span>
                <button onClick={()=>{updateUser(user.id,user.Age)}}>Increase Age</button>
                <button onClick={()=>{deleteUser(user.id)}}>Delete</button>
              </div>);
          })}
      </div>

    
    </div>
    );
}

export default App;

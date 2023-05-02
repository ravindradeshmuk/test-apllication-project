import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Label from '@mui/material/InputLabel';
import './A.css';
import { MdDelete } from 'react-icons/md'
//import {MdModeEdit} from 'react-icons/Md'
import { MdModeEditOutline } from 'react-icons/md'


//import TestDate from './TestDate';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

  // border: 'none'
};

const A = () => {
  const [open, setOpen] = React.useState(false);

  const [todo, setTodo] = useState({ title: '', status: '', time: '', date: '' })
  const [todos, setTodos] = useState([])
  const [toggleid, setToggleid] = useState(true);
  const [editId, setEditId] = useState(0)
  const [record, setRecord] = useState("All")
  const [check, setCheck] = useState();
  //const [filterValue, setFilterValue] = useState([]);
  //const [showFilterData, setShowFilterData] = useState(false);
  // const [btnTask, setBtnTask] = useState(true)

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true)

  const todoHandle = (e) => {

    let value = e.target.value
    let name = e.target.name
    setTodo({
      ...todo,
      [name]: value
    })
  }

  const submitHandlor = (e) => {
    e.preventDefault()


    if (editId){
      const editTodo = todo.find((i) => i.id === editId)
      const updateTasks = todo.map((t) =>
        t.id === editTodo.id ? (t = { id: t.id, todo }) : { id: t.id, todo: t.todo }
      );

      setTodos(updateTasks.todo)
      setToggleid(false);
      //setEditId(id);
      setToggleid(true);



      return;
    }
    if (todo !== "") {
      setTodos([...todos, todo])
      setTodo("");
    }
    //else if(todo && !toggleid){
    //     setTodos(todos.map((a)=>{
    //    if(a.id===editId){
    //    return{...a,name:todo}
    //    }
    //   return a;
    //  })

    //   )}
    //   setTodo(editId.todo);
    //   setToggleid(false);
    //    setEditId(editId.id);
    //    setToggleid(true);

  }
  const handleDelete = (id) => {
    let deleteTodo = todos.filter((to, index) => index !== id);
    setTodos(deleteTodo);
  }


  const handleEdit = (index) => {
    todos.find((i) => i.id === editId)


    setOpen(true);
    // setTodos(editTodo);
    setToggleid(false);
    setEditId(index);
    setToggleid(true);

  }

  const filterProduct = todos.filter((arry) => {
    if (record === 'All') {
      return true
    } else if (record === 'Complite') {
      return arry.status === "Complite"
    } else if (record === 'InComplite') {
      return arry.status === "InComplite";
    }
  })









  // const filterData = (category) => {
  //   setShowFilterData(true);
  //   setFilterValue(category)
  // }

  useEffect(() => {
    if (setTodos.status === 'Complite') {
      setCheck(true);
    } else {
      setCheck(false);
    }
  })

  return (
    <>

      <div>
        <div className='navbar' style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
          <Button onClick={handleOpen}>Add Task</Button>

          <select name="stetus" style={{ cursor: "pointer" }} onChange={(e) => setRecord(e.target.value)}>
            <option value="All">All</option>
            <option value="Complite">Complite</option>
            <option value="InComplite">InComplite</option>
          </select>
        </div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >

          <Box sx={style} id='box'>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              Add Todo

            </Typography>

            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={submitHandlor}>

                <div>
                  <div className='formpage'>
                    <Label>Title</Label>
                    <input type="text" name='title' value={todos.title} onChange={todoHandle}required/>
                  </div>
                  <Label>Status</Label>

                  <select name="status" className='select' onChange={todoHandle} value={todos.status}>
                    <option>                    </option>
                    <option value="Complite">Complite</option>
                    <option value='InComplite'>InComplite</option>
                  </select>
                  <div className='button'>
                    <button type="submit" onClick={handleClose}>

                      {
                        toggleid === true ? "Add task" : "Update task"
                      }
                    </button>

                    <button type='button' id='btn' onClick={handleClose}>Cancle</button>

                  </div>

                </div>

              </form>
            </Typography >
          </Box>
        </Modal>
        <div className='parentdiv'>
          {filterProduct.map((arry, index) => {
            return (
              <div className='datadiv'>
                <div className='leftbar'>
                  <div style={{ display: "flex" }}>
                    <input type='checkbox' key={arry.id} checked={arry.status === 'Complite' ? 'checked' : check} />
                    <div> <h4>{arry.title}</h4>


                      <h6> {new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}</h6>
                    </div>
                  </div>


                </div>

                <div className='icon'>
                  <button onClick={() => handleDelete(index)}>
                    <MdDelete className='reacticon' />
                  </button>

                  <button onClick={() => handleEdit(todo.id)}>
                    <MdModeEditOutline className='reacticon' />

                  </button>

                </div>

              </div>



            )
          })}

        </div>

      </div>

    </>
  )
}
export default A;

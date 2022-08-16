const express = require('express')

const router= express.Router()

const conn= require('./database/db')




// selecionar item

router.get('/pokemons', function (req, res){
    conn.query('SELECT * FROM tb_pokemon ORDER BY id DESC', (error, result)=>{
        if(error){
            throw error;
        }else{
           
        res.send(result)

        }
    })
})





router.get('/',(req,res)=>{
    res.render('index')
})



router.get('/pokemon/:name', (req, res) => {

    const name = req.params.name

    conn.query('SELECT * FROM tb_pokemon WHERE name=?', [name], (error, result) => {

        if (error) {
            throw error
        } else {
            res.json(result)

        }
    })

})



// selecionar 1 item

router.get('/pokemon/:id',(req, res)=>{
      
       const id= req.params.id

    conn.query('SELECT * FROM tb_pokemon WHERE id=?',[id],(error, result)=>{
      
        if(error){
            throw error
        }else{
            res.json(result)
           
        }
    })

})



// router.get('*', function(req, res){
//   res.send('pagina não encontrado', 404);
// });






// excluir item



router.delete('/delete-action/:id',(req,res)=>{
    const id= req.params.id
    console.log(id)
 conn.query('DELETE FROM tb_pokemon WHERE id=?',[id],(error, result)=>{
        
  if(error){
    throw error
     }else{
          res.redirect('/')
        }})
                
   
})




// adicionar item
router.get('/add',(req, res)=>{
    res.render('add')
})



router.post('/add',(req, res)=>{
   
   const {name}= req.body
    const {hp}= req.body
    const {attack}= req.body
    const {defense}= req.body
    const {speed}= req.body
    const {special_attack}= req.body
    const {special_defense}= req.body


    conn.query('INSERT INTO tb_pokemon SET?', { name: name, hp: hp, attack: attack, defense: defense, speed: speed, special_attack: special_attack, special_defense: special_defense },(error, result)=>{
      if(error){
        throw error
      }else{
     

        res.json(result)
      }
  })


})

router.post('/result', (req, res) => {

    const { pokemon1 } = req.body
    const { pokemon2 } = req.body
    const { result } = req.body
   

    conn.query('INSERT INTO result SET?', { pokemon1: pokemon1, pokemon2: pokemon2, result: result }, (error, result) => {
        if (error) {
            throw error
        } else {


            res.json(result)
        }
    })


})


// editar item



router.post('/edit-action/:id', (req, res)=>{
    const id= req.params.id
     const {name}= req.body
    const {hp}= req.body
    const {attack}= req.body
    const {defense}= req.body
    const {speed}= req.body
    const {special_attack}= req.body
    const {special_defense}= req.body

  

    conn.query('UPDATE tb_pokemon SET? WHERE id = ?', [{ name: name, hp: hp, attack: attack, defense: defense, speed: speed, special_attack: special_attack, special_defense: special_defense }, id], (error, result) => {
        if (error) {
            throw error
        } else {
            //    res.redirect('/')
            res.send(result[0])
            // res.send(result)

           

        }
    })



})


module.exports= router;
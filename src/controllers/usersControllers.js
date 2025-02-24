const { read, parse, write, string } = require("../data/filesystem")
const path = require('path')
const directory = path.join(__dirname, "../data/users.json");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');


const usuario = {

  register: (req, res, next) => {
    res.render('users/register');

  },
  login: (req, res, next) => {
    res.render('users/login');
  },
  processregister: (req, res, next) => {

    const users = parse(read(directory));

    const { nombre, apellido, correo, contrasena, categoria } = req.body;
    const newuser = {
      id: uuidv4(),
      nombre,
      apellido,
      correo,
      contrasena:bcrypt.hashSync(contrasena, 10),
      
      categoria
    };

    users.push(newuser)
    write(directory,string(users));

    return res.redirect('/users/login');


  },
  identity: (req, res, next) => {

    const users = parse(read(directory));
    const { contrasena, correo } = req.body
    const user = users.find(user => user.correo === correo && bcrypt.compareSync(contrasena, user.contrasena))

    if (!user) {
      return res.render('users/login', {
        error: "Credenciales inválidas"
      })
    }

    req.session.userLogin = {
      id: user.id,
      name: user.name,
      rol: user.rol
    }



    return res.redirect(`/users/profile/${user.id}`)
  },
  profile: (req, res, next) => {



    res.render('users/profile')
  },
  logout: (req, res, next) => {


  },
  update: (req, res, next) => {

    const users = parse(read(directory));
    const id = req.params.id;
    const user = users.find((user) => user.id === id);

    req.body.id = id;
    req.body.avatar = req.file ? req.file.filename : user.avatar;


    if (req.body.contrasena && req.body.contrasena2) {
      req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
    } else {
      req.body.contrasena = user.contrasena;
    }

    delete req.body.contrasena2;

    const index = users.findIndex((user) => user.id === id);
    users[index] = req.body;

    write(directory, string(users));
    res.send(req.body);

  },

  admin: (req, res, next) => {

    const products = parse(read(directory));

    const deportes = products.filter(producto => {
      return producto.categoria == "Deporte";
    })

    const aventura = products.filter(producto => {
      return producto.categoria == "Aventura";
    })

    res.render('users/admin');

  }

}


module.exports = usuario;
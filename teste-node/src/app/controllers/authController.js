/**
 * Responsavel pela validação do login e validação do token
 * @param express varaivel do framework express
 * @param bcrypt variavel para encryptografar a senha
 * @param jswt validao do Token
 * @param User variavel do usuario
 * @param router que rota tem que acessar para registar
 * @param authConfig configuração do hashing
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const jswt = require ('jsonwebtoken')
const User = require('../models/User');
const router = express.Router();
const authConfig = require('../../config/auth');

function generateToken(params = {}){
    return jswt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    });
}

/**
 * @constant router Usado para redirecionar URL de registro
 * @constant email Usado para validao se o email ja existe
 * @constant User para pegar os dados que a tabela usuario tem
 * @param req - requisição da aplicação
 * @param res - resposta da aplicação
 * @description ele cadastra na base de dados caso os dados nao existam, se existir ele volta uma mensagem de erro 
 */
router.post('/register', async(req, res) => {
    const { email }  = req.body;
    try {
        if(await User.findOne({email})){
            return res.status(400).send({error: 'User already exists' });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user,
            token: generateToken({ id: user.id}),
        });

    } catch (error) {
        return res.status(400).send({error: 'Registration failed'});
        
    }
});

/**
 * @constant router Usado para redirecionar URL de autentificação 
 * @constant email Usado para validao se o email ja existe
 * @constant User para pegar os dados que a tabela usuario tem
 * @param req - requisição da aplicação
 * @param res - resposta da aplicação
 * @description ele autentica o usuario para ve se esta cadastrado
 */
router.post('/authenticate', async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({ email }).select("+password");

    if(!user)
        return res.status(400).send({ error: 'User not found '});

    if(! await bcrypt.compare(password, user.password)) 
        return res.status(400).send({error:'invalid password '});

        res.send({ user, 
            token: generateToken({ id: user.id}),
        });

        user.password = undefined;
});

module.exports = app => app.use('/auth', router);
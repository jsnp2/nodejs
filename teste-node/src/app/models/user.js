//Importando a requisicao de acesso a base que ja existe na pasta DATABASE
const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

//campos que vamo ter dentro do banco de dados da tablea USER

const UserSchema = new mongoose.Schema({
    //campo email
    name: {
        type: String,
        require: true,
    },
    //campo email
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    //campo Senha
    password:{
        type: String,
        required: true,
        select: false,
    },
    //Data de quando foi Criada
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})


const User = mongoose.model('User', UserSchema);

module.exports = User;
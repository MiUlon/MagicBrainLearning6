export const handelSignin = (req, res, bcrypt, postgres) => {
    postgres.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return postgres.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(error => res.status(400).json('Cannot login'))
            } else {
                res.status(400).json('Cannot login')
            }
        })
        .catch(error => res.status(400).json('Cannot login'))
};
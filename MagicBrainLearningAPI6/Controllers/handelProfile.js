export const handelProfile = (req, res, postgres) => {
    const { id } = req.params;
    postgres.select('*').from('users').where({
        id: id
    })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('ID not found.');
            }
        })
        .catch(error => res.status(400).json('Error'));
};
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '82819b6c8d2d4417abbdebb80e6a3cdc'
});

export const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.CELEBRITY_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
}

export const handelImage = (req, res, postgres) => {
    const { id } = req.body;
    postgres('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(error => res.status(400).json('Cannot receive entries'));
};